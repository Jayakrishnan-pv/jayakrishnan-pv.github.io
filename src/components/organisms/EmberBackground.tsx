"use client";
import React, { useEffect, useRef } from "react";

const PARTICLE_COUNT = 80;

class Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
  color: string;
  dx: number;
  dy: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 2 + 1;
    this.speed = Math.random() * 0.7 + 0.2;
    this.alpha = Math.random() * 0.8 + 0.2;
    this.color = `rgba(255, ${Math.floor(Math.random() * 150 + 50)}, 0, ${this.alpha})`;
    const angle = Math.random() * 2 * Math.PI;
    this.dx = Math.cos(angle) * this.speed * 0.5;
    this.dy = Math.sin(angle) * this.speed * 0.5;
  }

  update(width: number, height: number) {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      // respawn
      this.x = Math.random() * width;
      this.y = height + 10;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

const EmberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => new Particle(width, height));
    }

    window.addEventListener("resize", resize);
    resize();

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        p.update(width, height);
        p.draw(ctx);
      }
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" />;
};

export default EmberBackground;
