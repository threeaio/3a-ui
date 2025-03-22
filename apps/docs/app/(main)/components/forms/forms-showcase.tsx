'use client'
import React from 'react'
import { StyleguideSection } from '@/ui/styleguide-section'
import { StyleguideRender } from '@/ui/styleguide-render'
import { Input } from '@3a.solutions/ui/forms'
import { Textarea } from '@3a.solutions/ui/forms'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@3a-ui/ui/forms'
import { Checkbox } from '@3a-ui/ui/forms'
import { RadioGroup, RadioGroupItem } from '@3a-ui/ui/forms'
import { Label } from '@3a-ui/ui/forms'
import { Search, Mail, EyeOff, Eye } from 'lucide-react'
import { SingleRowForm } from './example-forms/single-row-form'
import { ContactForm } from './example-forms/contact-form'
import { SimpleInputGroup } from './example-forms/simple-input-group'
import { ErrorInputGroup } from './example-forms/error-input-group'
import { ComplexFilterGroup } from './example-forms/complex-filter-group'

const PasswordInput: React.FC<React.ComponentProps<typeof Input>> = (props) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      icon={
        showPassword ? (
          <EyeOff className="h-4 w-4 cursor-pointer" onClick={() => setShowPassword(false)} />
        ) : (
          <Eye className="h-4 w-4 cursor-pointer" onClick={() => setShowPassword(true)} />
        )
      }
      {...props}
    />
  )
}

const FormsShowcase: React.FC = () => {
  return (
    <StyleguideSection title="Form Components" subline="Core form components and their usage">
      {/* Individual Components */}
      <StyleguideRender label="Input">
        <div className="space-y-10 max-w-2xl">
          <div className="flex flex-col gap-2">
            <Label htmlFor="default">Default Input</Label>
            <Input id="default" placeholder="Enter text..." />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="with-icon">Input with Icon</Label>
            <Input id="with-icon" placeholder="Search..." icon={<Search className="h-4 w-4" />} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="clearable">Clearable Input</Label>
            <Input
              id="clearable"
              placeholder="Type to see clear button..."
              clearable
              onClear={() => console.log('Input cleared')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="icon-and-clear">Input with Icon and Clear</Label>
            <Input
              id="icon-and-clear"
              placeholder="Search with clear..."
              icon={<Search className="h-4 w-4" />}
              clearable
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email-input">Email Input with Icon</Label>
            <Input
              id="email-input"
              type="email"
              placeholder="your@email.com"
              icon={<Mail className="h-4 w-4" />}
              clearable
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password Input with Toggle</Label>
            <PasswordInput id="password" placeholder="Enter password" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="disabled">Disabled Input</Label>
            <Input id="disabled" placeholder="Disabled input" disabled />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="error">Input with Error</Label>
            <Input aria-invalid id="error" placeholder="Error state" className="border-destructive" />
            <p className="text-sm text-destructive">This field is required</p>
          </div>
        </div>
      </StyleguideRender>

      <StyleguideRender label="Textarea">
        <div className="space-y-5 max-w-2xl">
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
        <div className="space-y-5 max-w-2xl">
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
        <div className="space-y-2">
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
        <SingleRowForm />
      </StyleguideRender>

      <StyleguideRender label="Contact Form">
        <ContactForm />
      </StyleguideRender>

      <StyleguideRender label="Simple Input Group">
        <SimpleInputGroup />
      </StyleguideRender>

      <StyleguideRender label="Input Group with Error">
        <ErrorInputGroup />
      </StyleguideRender>

      <StyleguideRender label="Complex Filter Group">
        <ComplexFilterGroup />
      </StyleguideRender>
    </StyleguideSection>
  )
}

export default FormsShowcase
