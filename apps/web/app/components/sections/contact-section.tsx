import { Button } from '@3a-ui/ui/button'
import { Badge } from '@3a-ui/ui/badge'

export function ContactSection() {
  return (
    <section id="contact" className="border-y py-20">
      <div className="container mx-auto px-5 md:px-10">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 md:p-16">
              <Badge variant="outline" className="mb-5">
                Get In Touch
              </Badge>
              <h2 className="text-2xl   mb-5">Start Your Project Today</h2>
              <p className="text-muted-foreground mb-10 max-w-md">
                Ready to transform your business with a custom application? Contact us to discuss your needs and get
                started.
              </p>

              <div className="space-y-5">
                <div className="flex gap-3 items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="size-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="">Email Us</p>
                    <p className="text-sm text-muted-foreground">info@3a-solutions.com</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="size-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="">Call Us</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="size-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className=" ">Office</p>
                    <p className="text-sm text-muted-foreground">
                      123 Business Ave, Suite 100, San Francisco, CA 94107
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 bg-background p-10 md:p-16">
              <h3 className="  text-xl mb-5">Send us a message</h3>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm  ">First Name</label>
                    <input type="text" className="w-full px-4 py-2 rounded-md border border-input bg-background" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm  ">Last Name</label>
                    <input type="text" className="w-full px-4 py-2 rounded-md border border-input bg-background" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm  ">Email</label>
                  <input type="email" className="w-full px-4 py-2 rounded-md border border-input bg-background" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm  ">Company</label>
                  <input type="text" className="w-full px-4 py-2 rounded-md border border-input bg-background" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm  ">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                  ></textarea>
                </div>

                <Button variant="primary" size="lg" className="w-full">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
