'use client';
import React from 'react';
import { Input } from '@3a-ui/ui/forms';
import { Textarea } from '@3a-ui/ui/forms';
import { Label } from '@3a-ui/ui/forms';
import { Button } from '@3a-ui/ui/button';
import { Checkbox } from '@3a-ui/ui/forms';

export const ContactForm: React.FC = () => {
  return (
    <form className="space-y-5 max-w-md">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your name" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="your@email.com" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Your message..." />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
};
