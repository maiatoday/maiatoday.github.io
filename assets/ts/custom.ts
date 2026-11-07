// custom script for adding particles to sidebar

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar.left-sidebar');
    if (!sidebar) return;

    // Create container as an absolutely positioned div overlay
    const container = document.createElement('div');
    container.className = 'sidebar-particles-container';
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    container.appendChild(canvas);
    
    // Insert into the main sidebar container
    sidebar.appendChild(container);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    let isSwarming = false;
    let isMouseInSidebar = false;
    let mouseX = 0;
    let mouseY = 0;
    let leaderIndex = -1;

    sidebar.addEventListener('mouseenter', () => isMouseInSidebar = true);
    sidebar.addEventListener('mouseleave', () => isMouseInSidebar = false);

    // Track mouse position relative to sidebar
    sidebar.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = sidebar.getBoundingClientRect();
        mouseX = mouseEvent.clientX - rect.left;
        mouseY = mouseEvent.clientY - rect.top;
    });

    // Easter egg toggle on profile picture click
    const avatarLink = sidebar.querySelector('.site-avatar a');
    if (avatarLink) {
        avatarLink.addEventListener('click', (e: Event) => {
            e.preventDefault(); // Prevent navigating home
            isSwarming = !isSwarming;
            if (isSwarming && particles.length > 0) {
                leaderIndex = Math.floor(Math.random() * particles.length);
            }
        });
    }

    class Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        baseVx: number;
        baseVy: number;
        radius: number;
        color: string;

        constructor(x: number, y: number, radius: number, color: string) {
            this.x = x;
            this.y = y;
            // Slow, lazy movement
            this.baseVx = (Math.random() - 0.5) * 0.3;
            this.baseVy = (Math.random() - 0.5) * 0.3;
            this.vx = this.baseVx;
            this.vy = this.baseVy;
            this.radius = radius;
            this.color = color;
        }

        update(index: number) {
            if (isSwarming) {
                let targetX: number;
                let targetY: number;

                if (index === leaderIndex) {
                    if (isMouseInSidebar) {
                        targetX = mouseX;
                        targetY = mouseY;
                    } else {
                        // Leader moves randomly if mouse is out
                        // Modulate base velocities very gently
                        this.baseVx += (Math.random() - 0.5) * 0.02;
                        this.baseVy += (Math.random() - 0.5) * 0.02;
                        // Clamp base velocity lower so the leader's random movement is lazier
                        if (this.baseVx > 0.45) this.baseVx = 0.45;
                        if (this.baseVx < -0.45) this.baseVx = -0.45;
                        if (this.baseVy > 0.45) this.baseVy = 0.45;
                        if (this.baseVy < -0.45) this.baseVy = -0.45;

                        targetX = this.x + this.baseVx * 50;
                        targetY = this.y + this.baseVy * 50;
                    }
                } else {
                    // Followers target the leader
                    const leader = particles[leaderIndex];
                    targetX = leader.x;
                    targetY = leader.y;
                }

                // Swarm towards target
                const dx = targetX - this.x;
                const dy = targetY - this.y;
                const accel = index === leaderIndex ? 0.002 : 0.0005; // Followers turn slower
                this.vx += dx * accel;
                this.vy += dy * accel;

                // Separation rule: Keep distance and avoid overlap
                let sepX = 0;
                let sepY = 0;
                let count = 0;
                const minDistance = 8; // Slightly larger minimum distance
                
                for (let i = 0; i < particles.length; i++) {
                    if (i === index) continue;
                    const other = particles[i];
                    const distSq = Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2);
                    if (distSq < minDistance * minDistance && distSq > 0) {
                        const dist = Math.sqrt(distSq);
                        sepX += (this.x - other.x) / dist;
                        sepY += (this.y - other.y) / dist;
                        count++;
                    }
                }

                if (count > 0) {
                    this.vx += (sepX / count) * 0.05; // Apply separation force much more gently
                    this.vy += (sepY / count) * 0.05;
                }
                
                // Speed limit when swarming
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                
                // Set much calmer speed limits for the followers
                let maxSpeed = isMouseInSidebar ? 1.5 : 0.6; 
                
                if (index === leaderIndex) {
                    // Leader speeds
                    maxSpeed = isMouseInSidebar ? 3.0 : 0.5;
                }
                
                if (speed > maxSpeed) {
                    this.vx = (this.vx / speed) * maxSpeed;
                    this.vy = (this.vy / speed) * maxSpeed;
                }
            } else {
                // Return base velocities to normal lazy bounds if they were altered by leader logic
                if (Math.abs(this.baseVx) > 0.3) {
                     this.baseVx *= 0.95;
                }
                if (Math.abs(this.baseVy) > 0.3) {
                     this.baseVy *= 0.95;
                }

                // Gently return to base lazy movement
                this.vx += (this.baseVx - this.vx) * 0.05;
                this.vy += (this.baseVy - this.vy) * 0.05;
            }

            this.x += this.vx;
            this.y += this.vy;

            // Bounce off walls
            if (this.x - this.radius < 0) {
                this.x = this.radius;
                this.vx *= -1;
                this.baseVx *= -1;
            } else if (this.x + this.radius > width) {
                this.x = width - this.radius;
                this.vx *= -1;
                this.baseVx *= -1;
            }

            if (this.y - this.radius < 0) {
                this.y = this.radius;
                this.vy *= -1;
                this.baseVy *= -1;
            } else if (this.y + this.radius > height) {
                this.y = height - this.radius;
                this.vy *= -1;
                this.baseVy *= -1;
            }
        }

        draw(ctx: CanvasRenderingContext2D, index: number) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    let particles: Particle[] = [];

    function initParticles() {
        particles = [];
        // Increased particle density
        const numParticles = Math.floor((width * height) / 1500); 
        
        // Determine colors based on dark mode.
        const isDarkMode = document.documentElement.dataset.scheme === 'dark';
        
        // Expanded color variations
        const colorPalette = isDarkMode 
            ? ['#aaaaaa', '#bbbbbb', '#cccccc', '#dddddd', '#eeeeee', '#ffffff', '#999999', '#f0f0f0'] 
            : ['#111111', '#222222', '#333333', '#444444', '#555555', '#666666', '#777777', '#888888'];

        for (let i = 0; i < numParticles; i++) {
            const radius = Math.random() * 1.0 + 0.5; // Smaller particles (0.5-1.5px)
            const x = Math.random() * (width - radius * 2) + radius;
            const y = Math.random() * (height - radius * 2) + radius;
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            
            particles.push(new Particle(x, y, radius, color));
        }
    }

    function animate() {
        if (!width || !height) {
            requestAnimationFrame(animate);
            return;
        }

        ctx!.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update(i);
            particles[i].draw(ctx!, i);
        }

        requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const newWidth = entry.contentRect.width;
            const newHeight = entry.contentRect.height;
            
            // Re-init if sizes change significantly or if it's the first time
            if (Math.abs(width - newWidth) > 10 || Math.abs(height - newHeight) > 10) {
                width = newWidth;
                height = newHeight;
                canvas.width = width;
                canvas.height = height;
                initParticles();
            } else {
                width = newWidth;
                height = newHeight;
                canvas.width = width;
                canvas.height = height;
            }
        }
    });

    resizeObserver.observe(container);

    // Watch for dark mode changes 
    const schemeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-scheme') {
                initParticles(); // Re-initialize colors
            }
        });
    });

    schemeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-scheme']
    });

    animate();
});
