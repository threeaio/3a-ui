import React from 'react';
import { StyleguideSection } from '../../ui/styleguide-section';
import { StyleguideRender } from '../../ui/styleguide-render';
import { heightClasses, paddingClasses } from '../../ui-config';
import { Input } from '@3a-ui/ui/forms';
import { Textarea } from '@3a-ui/ui/forms';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@3a-ui/ui/forms';
import { Checkbox } from '@3a-ui/ui/forms';
import { RadioGroup, RadioGroupItem } from '@3a-ui/ui/forms';
import { Label } from '@3a-ui/ui/forms';
import { Button } from '@3a-ui/ui/button';

const FormsShowcase: React.FC = () => {
  return (
    <StyleguideSection title="Form Components" subline="Core form components and their usage">
      {/* Individual Components */}
      <StyleguideRender label="Input">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="default">Default Input</Label>
            <Input id="default" placeholder="Enter text..." />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="disabled">Disabled Input</Label>
            <Input id="disabled" placeholder="Disabled input" disabled />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="error">Input with Error</Label>
            <Input id="error" placeholder="Error state" className="border-destructive" />
            <p className="text-sm text-destructive">This field is required</p>
          </div>
        </div>
      </StyleguideRender>

      <StyleguideRender label="Textarea">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="textarea">Default Textarea</Label>
            <Textarea id="textarea" placeholder="Enter long text..." />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="textarea-disabled">Disabled Textarea</Label>
            <Textarea id="textarea-disabled" placeholder="Disabled textarea" disabled />
          </div>
        </div>
      </StyleguideRender>

      <StyleguideRender label="Select">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="select">Default Select</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
                <SelectItem value="3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="select-disabled">Disabled Select</Label>
            <Select disabled>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Disabled select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </StyleguideRender>

      <StyleguideRender label="Checkbox">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled">Disabled checkbox</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="checked" checked disabled />
            <Label htmlFor="checked">Checked disabled</Label>
          </div>
        </div>
      </StyleguideRender>

      <StyleguideRender label="Radio Group">
        <RadioGroup defaultValue="option-1">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-1" id="option-1" />
              <Label htmlFor="option-1">Option 1</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-2" id="option-2" />
              <Label htmlFor="option-2">Option 2</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-3" id="option-3" disabled />
              <Label htmlFor="option-3">Option 3 (disabled)</Label>
            </div>
          </div>
        </RadioGroup>
      </StyleguideRender>

      {/* Demo Forms */}
      <StyleguideRender label="Single Row Form">
        <form className={`flex items-center gap-4 border-y ${heightClasses[0]} ${paddingClasses.horizontal[2]}`}>
          <div className="flex-1">
            <Input placeholder="Search..." />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </StyleguideRender>

      <StyleguideRender label="Contact Form">
        <form className="space-y-4 max-w-md">
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
      </StyleguideRender>
    </StyleguideSection>
  );
};

export default FormsShowcase;
