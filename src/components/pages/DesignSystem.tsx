import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '../layouts/MainLayout';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardMedia,
  Badge,
  Alert,
  Container,
  Input,
  Textarea,
  Section,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  Tooltip,
  Modal,
  CallToAction,
  ThemeToggle
} from '../ui';

// Data-driven definitions
const colorGroups = [
  {
    title: 'Primary Colors',
    colors: [
      '#eef2ff','#e0e7ff','#c7d2fe','#a5b4fc','#818cf8','#6366f1','#4f46e5','#4338ca','#3730a3','#312e81'
    ]
  },
  {
    title: 'Secondary Colors',
    colors: [
      '#f0fdfa','#ccfbf1','#99f6e4','#5eead4','#2dd4bf','#14b8a6','#0d9488','#0f766e','#115e59','#134e4a'
    ]
  },
  {
    title: 'Accent Colors',
    colors: [
      '#fff7ed','#ffedd5','#fed7aa','#fdba74','#fb923c','#f97316','#ea580c','#c2410c','#9a3412','#7c2d12'
    ]
  }
];

const typographyItems = [
  { label: 'Heading 1', tag: 'h1', className: 'text-4xl font-bold tracking-tight' },
  { label: 'Heading 2', tag: 'h2', className: 'text-3xl font-semibold' },
  { label: 'Heading 3', tag: 'h3', className: 'text-2xl font-semibold' },
  { label: 'Body Default', tag: 'p', className: 'text-base' },
  { label: 'Small Text', tag: 'p', className: 'text-sm' }
];

const badgeVariants = ['default','primary','secondary','accent','success','error'];
const buttonVariants = ['primary','secondary','accent','outline','ghost'];

const DesignSystem: React.FC = () => {
  const [alerts, setAlerts] = useState({ info: true, success: true, warning: true, error: true });
  const [isModalOpen, setModalOpen] = useState(false);

  const resetAlerts = () => setAlerts({ info: true, success: true, warning: true, error: true });

  return (
    <MainLayout>
      <Helmet>
        <title>Design System | Priyanshu Chawda</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container className="py-12">
        <Section title="Colors">
          {colorGroups.map(group => (
            <Section key={group.title} subtitle={group.title} className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {group.colors.map(code => (
                <div key={code} className="flex flex-col items-center">
                  <div className="h-16 w-full rounded mb-1" style={{ backgroundColor: code }} />
                  <div className="text-xs text-gray-600 dark:text-gray-400">{code}</div>
                </div>
              ))}
            </Section>
          ))}
        </Section>

        <Section title="Typography">
          {typographyItems.map(({ label, tag, className }) => {
            const Element = tag as keyof JSX.IntrinsicElements;
            return (
              <div key={label} className="mb-6">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</div>
                <Element className={className}>The quick brown fox jumps over the lazy dog</Element>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{className}</div>
              </div>
            );
          })}
        </Section>

        <Section title="Badges & Buttons">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Badge Variants</h4>
              <div className="flex flex-wrap gap-2">
                {badgeVariants.map(v => <Badge key={v} variant={v as any}>{v}</Badge>)}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Button Variants</h4>
              <div className="flex flex-wrap gap-4">
                {buttonVariants.map(v => <Button key={v} variant={v as any}>{v} Button</Button>)}
              </div>
            </div>
          </div>
        </Section>

        <Section title="Alerts">
          <div className="space-y-4">
            {Object.entries(alerts).map(([key, show]) => show && (
              <Alert key={key} variant={key as any} title={key.toUpperCase()} onClose={() => setAlerts(prev => ({ ...prev, [key]: false }))}>
                This is a {key} alert.
              </Alert>
            ))}
            <Button variant="outline" onClick={resetAlerts}>Reset Alerts</Button>
          </div>
        </Section>

        <Section title="Cards">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardBody>
                <h4 className="font-semibold mb-2">Basic Card</h4>
                <p className="mb-4">Simple card content with actions.</p>
                <Button variant="primary">Learn More</Button>
              </CardBody>
            </Card>
            <Card hoverable>
              <CardMedia src="/images/placeholder.jpg" aspectRatio="video" />
              <CardHeader><h4 className="font-semibold">Media Card</h4></CardHeader>
              <CardBody><p>Card with media and header.</p></CardBody>
              <CardFooter><Button variant="outline">View</Button></CardFooter>
            </Card>
          </div>
        </Section>

        <Section title="Modals & Tooltips" className="space-y-8">
          <div>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Example Modal" footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}>
              <p>Modal content goes here.</p>
            </Modal>
          </div>
          <div className="flex gap-4">
            <Tooltip content="Tooltip text"><Button>Hover me</Button></Tooltip>
          </div>
        </Section>

        <Section title="Skeleton Loaders">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SkeletonText lines={3} />
            <div className="flex items-center gap-4"><SkeletonAvatar size="3rem"/><SkeletonText lines={2}/></div>
            <SkeletonCard />
          </div>
        </Section>

        <Section title="Forms">
          <Card>
            <CardBody>
              <form className="space-y-4">
                <Input id="name" label="Name" placeholder="John Doe" />
                <Textarea id="message" label="Message" rows={4} />
                <Button type="submit">Submit</Button>
              </form>
            </CardBody>
          </Card>
        </Section>

        <Section title="Call to Action">
          <CallToAction title="Join Now" description="Start your journey today." primaryButtonText="Sign Up" />
        </Section>

        <Section title="Theme Toggles">
          <div className="flex gap-4">
            <ThemeToggle variant="icon" />
            <ThemeToggle variant="switch" showLabel />
            <ThemeToggle variant="button" />
          </div>
        </Section>
      </Container>
    </MainLayout>
  );
};

export default DesignSystem;