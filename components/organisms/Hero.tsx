import { Card } from '@/components/molecules/Card';
import { Button } from '@/components/atoms/Button';

export type HeroProps = {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
};

export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <Card className="text-center">
      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle && <p className="mb-6 text-gray-600">{subtitle}</p>}
      {cta && (
        <div className="flex items-center justify-center gap-3">
          <Button href={cta.href} variant="primary">
            {cta.label}
          </Button>
          <Button href="#" variant="ghost">
            Learn more
          </Button>
        </div>
      )}
    </Card>
  );
}
