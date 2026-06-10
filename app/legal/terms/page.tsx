import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — NEXUS AI Consultancy',
  description: 'Terms of Service for NEXUS AI Consultancy. Read our terms governing the use of the NEXUS AI receptionist platform.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-white">
            NEXUS<span className="text-teal-400">.</span>
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
            &larr; Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-400">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-3 text-sm text-slate-400">
            <strong className="text-slate-300">Effective Date:</strong> January 1, 2026 &nbsp;&middot;&nbsp;
            <strong className="text-slate-300">Last Updated:</strong> March 1, 2026
          </p>
        </div>

        <div className="prose-legal">
          <Section id="1" title="1. Definitions">
            <p>"NEXUS," "we," "us," or "our" refers to NEXUS AI Consultancy, including its directors, officers, employees, agents, affiliates, and successors.</p>
            <p>"You," "Your," or "Customer" refers to any individual or entity that registers for, accesses, or uses the Service.</p>
            <p>"Service" refers to NEXUS's AI-powered virtual receptionist platform (including but not limited to "AVA"), call routing, scheduling, transcription, automation workflows, and all related products and features offered by NEXUS.</p>
            <p>"Subscription" refers to the recurring paid plan selected by Customer (Lite, Pro, Scale, or Custom).</p>
            <p>"Minute" refers to one (1) minute of inbound or outbound call activity processed through the Service, rounded up to the nearest minute per call.</p>
          </Section>

          <Section id="2" title="2. Acceptance of Terms">
            <p>By accessing, registering for, or using the Service, You acknowledge that You have read, understood, and agree to be bound by these Terms of Service ("Terms") and our Privacy Policy, which is incorporated herein by reference. If You do not agree to these Terms, You may not access or use the Service.</p>
          </Section>

          <Section id="3" title="3. Eligibility">
            <p>You represent and warrant that You are at least eighteen (18) years of age and have the legal capacity to enter into this agreement. If You are using the Service on behalf of a business entity, You represent that You are authorized to bind that entity to these Terms.</p>
          </Section>

          <Section id="4" title="4. Pricing and Billing Terms">
            <Subsection title="4.1 Subscription Plans">
              <p>NEXUS offers tiered Subscription plans. Each plan includes a defined allotment of monthly call Minutes. Plan details, including pricing and Minute allotments, are published at nexusai.com/pricing and may be updated from time to time.</p>
            </Subsection>
            <Subsection title="4.2 Minute-Based Billing">
              <p>The Service is billed by total Minutes used per billing cycle, not by call count. Approximate "call counts" displayed on pricing pages are based on an industry-standard average call length of three (3) minutes and are provided for illustrative purposes only. Actual call durations vary, and Customer is billed for actual Minutes consumed.</p>
            </Subsection>
            <Subsection title="4.3 Billing Cycle">
              <p>Subscriptions are billed monthly in advance on the date of initial activation and on the same date each subsequent month, or annually if an annual plan is selected. All fees are non-refundable except as expressly set forth in Section 6.</p>
            </Subsection>
            <Subsection title="4.4 Payment Method">
              <p>Customer authorizes NEXUS (or its third-party payment processor) to charge the payment method on file for all applicable fees, including Subscription fees and approved overage charges.</p>
            </Subsection>
            <Subsection title="4.5 Taxes">
              <p>All fees are exclusive of applicable taxes, levies, and duties (including VAT, GST, and sales tax). Customer is responsible for paying all such taxes associated with their use of the Service.</p>
            </Subsection>
            <Subsection title="4.6 Price Changes">
              <p>NEXUS reserves the right to modify pricing at any time. Price changes will not affect Customer's current billing cycle but will apply to subsequent renewals upon thirty (30) days' written notice.</p>
            </Subsection>
          </Section>

          <Section id="5" title="5. Overage Charges and Approval">
            <Subsection title="5.1 Overage Notification">
              <p>If Customer's usage approaches the Minute allotment of their Subscription plan in any given billing cycle, NEXUS will provide notification via email when usage reaches eighty percent (80%) and one hundred percent (100%) of the Minute allotment.</p>
            </Subsection>
            <Subsection title="5.2 Approval Requirement">
              <p className="font-semibold text-white">No overage charges will be applied without Customer's prior approval.</p>
              <p>Once Customer's Minute allotment is exhausted, the Service may pause new call processing until Customer either: (a) approves overage billing at the per-minute rate associated with their Subscription tier, or (b) upgrades to a higher Subscription tier.</p>
            </Subsection>
            <Subsection title="5.3 Per-Minute Overage Rates">
              <p>Overage rates are published on the pricing page and vary by plan. NEXUS reserves the right to adjust overage rates with thirty (30) days' notice.</p>
            </Subsection>
            <Subsection title="5.4 Customer Responsibility">
              <p>Customer is solely responsible for monitoring their usage and approving or declining overage charges. NEXUS is not liable for missed calls or service interruptions resulting from Customer's failure to approve overage charges or upgrade their plan in a timely manner.</p>
            </Subsection>
          </Section>

          <Section id="6" title="6. Cancellation and Refunds">
            <Subsection title="6.1 Cancellation by Customer">
              <p>Customer may cancel their Subscription at any time through their account dashboard or by contacting support. Cancellation takes effect at the end of the current billing cycle. Customer retains access to the Service until that date.</p>
            </Subsection>
            <Subsection title="6.2 No Pro-Rated Refunds">
              <p>Subscription fees are non-refundable. NEXUS does not provide partial or pro-rated refunds for unused Minutes, partial months, or unused features.</p>
            </Subsection>
            <Subsection title="6.3 Refund Exceptions">
              <p>NEXUS may, at its sole discretion, issue refunds in the following limited circumstances: (a) Service unavailability exceeding the SLA threshold defined in Section 7; (b) Duplicate or erroneous billing caused by NEXUS or its payment processor; (c) Cancellation within seven (7) days of initial signup, where the Customer has used less than ten percent (10%) of their Minute allotment.</p>
            </Subsection>
            <Subsection title="6.4 Termination by NEXUS">
              <p>If NEXUS terminates Customer's account for breach of these Terms, no refund will be issued. If NEXUS terminates the Customer for reasons other than breach (e.g., discontinuation of the Service), Customer will receive a pro-rated refund for the unused portion of their current billing cycle.</p>
            </Subsection>
          </Section>

          <Section id="7" title="7. Service Availability (SLA)">
            <Subsection title="7.1 Uptime Commitment">
              <p>NEXUS targets a monthly uptime of ninety-nine percent (99.0%) for the core call-handling functionality of the Service, calculated on a calendar-month basis and excluding Scheduled Maintenance and Force Majeure events.</p>
            </Subsection>
            <Subsection title="7.2 Scheduled Maintenance">
              <p>NEXUS may perform scheduled maintenance with at least forty-eight (48) hours' advance notice. Scheduled Maintenance windows are excluded from uptime calculations.</p>
            </Subsection>
            <Subsection title="7.3 Service Credits">
              <p>If monthly uptime falls below 99.0%, Customer may request a service credit equal to ten percent (10%) of the monthly Subscription fee. Service credits must be requested in writing within thirty (30) days of the affected month and will be applied to Customer's next billing cycle. Service credits are Customer's sole and exclusive remedy for service unavailability.</p>
            </Subsection>
            <Subsection title="7.4 Exclusions">
              <p>The SLA does not apply to: (a) Issues caused by Customer's equipment, network, or third-party services; (b) Issues caused by integrations with third-party platforms; (c) Force Majeure events as defined in Section 17; (d) Beta features or features explicitly labeled as experimental.</p>
            </Subsection>
          </Section>

          <Section id="8" title="8. Acceptable Use">
            <Subsection title="8.1 Prohibited Activities">
              <p>You agree not to use the Service: (a) For any unlawful, fraudulent, or harmful purpose; (b) To violate any applicable local, state, federal, or international law, including but not limited to the U.S. Telephone Consumer Protection Act (TCPA), the CAN-SPAM Act, the EU General Data Protection Regulation (GDPR), and any analogous laws in jurisdictions where Customer or its callers are located; (c) To make calls to emergency services lines or any number for which the called party is charged; (d) To send or facilitate spam, unsolicited commercial communications, or unauthorized telemarketing; (e) To harass, threaten, defame, abuse, or otherwise harm any individual or entity; (f) To distribute viruses, malware, or any code intended to disrupt or compromise systems; (g) To circumvent, disable, or otherwise interfere with security or authentication features of the Service; (h) To collect, harvest, or process personal information of third parties without proper legal basis or consent; (i) To resell, sublicense, or redistribute the Service without NEXUS's prior written consent.</p>
            </Subsection>
            <Subsection title="8.2 Caller ID and Identification">
              <p>Customer must transmit accurate Caller ID information on all outbound calls and may not block, mask, spoof, or misrepresent caller identity.</p>
            </Subsection>
            <Subsection title="8.3 Consent for Outbound Communications">
              <p>Where the Service is used for outbound calling or messaging, Customer represents and warrants that all recipients have provided prior express consent or that an established business relationship exists, as required by applicable law. Upon request, Customer agrees to provide evidence of such consent.</p>
            </Subsection>
            <Subsection title="8.4 Call Recording Consent">
              <p>The Service may record calls for quality, training, and Service-improvement purposes. Call recording laws vary significantly by jurisdiction. Most U.S. states and most countries require only one-party consent, meaning a single party to the call may consent to recording. Certain U.S. states and other jurisdictions, however, require all-party consent.</p>
              <p className="font-semibold text-white">Customer is solely responsible for understanding and complying with the recording-consent laws applicable to themselves and their callers, including obtaining proper consent disclosures at the start of each call where required.</p>
              <p>By using the Service, Customer agrees to enable any consent disclosure features (such as greeting messages) made available by NEXUS where required by applicable law. NEXUS provides tools to support consent disclosures but makes no representation or warranty that recordings created through the Service will comply with any specific recording-consent law. Customer indemnifies NEXUS against any claims, damages, or liabilities arising from non-compliant recording practices.</p>
            </Subsection>
            <Subsection title="8.5 Enforcement">
              <p>NEXUS reserves the right to investigate suspected violations, suspend or limit Service access, throttle call volume, or terminate Customer's account for breaches of this Section 8.</p>
            </Subsection>
          </Section>

          <Section id="9" title="9. Data and Privacy">
            <Subsection title="9.1 Customer Data">
              <p>"Customer Data" includes call recordings, transcripts, contact information, business configurations, and any other information provided to or generated by Customer through the Service.</p>
            </Subsection>
            <Subsection title="9.2 Ownership">
              <p>Customer retains ownership of all Customer Data. Customer grants NEXUS a worldwide, non-exclusive, royalty-free license to host, process, transmit, store, and use Customer Data solely as necessary to provide, maintain, and improve the Service.</p>
            </Subsection>
            <Subsection title="9.3 Data Processing">
              <p>NEXUS processes Customer Data in accordance with its Privacy Policy and applicable data protection laws, including the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), where applicable.</p>
            </Subsection>
            <Subsection title="9.4 Sub-processors">
              <p>NEXUS may engage third-party sub-processors to deliver the Service. A current list of sub-processor categories is set forth in our Privacy Policy.</p>
            </Subsection>
            <Subsection title="9.5 Data Security">
              <p>NEXUS implements reasonable administrative, technical, and physical safeguards to protect Customer Data against unauthorized access, disclosure, alteration, or destruction. No system is fully secure, however, and NEXUS does not guarantee absolute security.</p>
            </Subsection>
            <Subsection title="9.6 Data Retention and Deletion">
              <p>NEXUS retains Customer Data for the duration of the Subscription and for a reasonable period thereafter for legal, audit, and operational purposes. Customer may request export or deletion of Customer Data by contacting support.</p>
            </Subsection>
            <Subsection title="9.7 Data Breach Notification">
              <p>In the event of a confirmed data breach affecting Customer Data, NEXUS will notify Customer without undue delay and in accordance with applicable law.</p>
            </Subsection>
          </Section>

          <Section id="10" title="10. User Content and License">
            <p>By submitting User Content (including call recordings, transcripts, custom configurations, prompts, and feedback), You grant NEXUS a worldwide, non-exclusive, royalty-free license to use such content as necessary to operate, improve, and develop the Service, including for training and refining AI models in aggregated and anonymized form.</p>
            <p>You represent and warrant that Your User Content does not infringe any third-party rights and complies with all applicable laws.</p>
          </Section>

          <Section id="11" title="11. Account Responsibilities">
            <p>You are responsible for maintaining the confidentiality of Your account credentials and for all activities that occur under Your account. You agree to notify NEXUS immediately of any unauthorized access. NEXUS is not liable for any loss or damage arising from Your failure to safeguard Your account.</p>
          </Section>

          <Section id="12" title="12. Intellectual Property">
            <p>All software, source code, models, documentation, branding, designs, and other materials provided through the Service (collectively, "NEXUS IP") are the exclusive property of NEXUS or its licensors. Except for the limited license to use the Service granted herein, no rights in NEXUS IP are transferred to Customer.</p>
          </Section>

          <Section id="13" title="13. Disclaimers">
            <p className="uppercase text-sm leading-relaxed">The Service is provided "as is" and "as available," without warranties of any kind, either express or implied, including implied warranties of merchantability, fitness for a particular purpose, title, accuracy, and non-infringement.</p>
            <p className="uppercase text-sm leading-relaxed">NEXUS does not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. NEXUS makes no warranty regarding the accuracy, reliability, or outcomes of AI-generated responses, transcriptions, or automated decisions.</p>
          </Section>

          <Section id="14" title="14. Limitation of Liability">
            <p className="uppercase text-sm leading-relaxed">To the maximum extent permitted by law, NEXUS shall not be liable for any indirect, incidental, special, consequential, or exemplary damages (including loss of profits, revenue, business, goodwill, or data) arising out of or related to your use of, or inability to use, the Service.</p>
            <p className="uppercase text-sm leading-relaxed">NEXUS's total cumulative liability under these Terms shall not exceed the greater of (a) the amount paid by Customer to NEXUS in the twelve (12) months preceding the event giving rise to liability, or (b) one hundred U.S. dollars (US $100).</p>
          </Section>

          <Section id="15" title="15. Indemnification">
            <p>You agree to indemnify, defend, and hold harmless NEXUS and its affiliates, officers, employees, and agents from and against any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising from or related to: (a) Your use or misuse of the Service; (b) Your violation of these Terms or any applicable law; (c) Your violation of any third-party rights, including telemarketing, privacy, or recording-consent laws; (d) Your User Content.</p>
          </Section>

          <Section id="16" title="16. Suspension and Termination">
            <p>NEXUS may suspend or terminate Customer's access to the Service at any time, with or without notice, for: (a) Breach of these Terms; (b) Suspected fraudulent, abusive, or unlawful activity; (c) Non-payment of fees; (d) Compliance with legal obligations or regulatory requests.</p>
            <p>Upon termination, Customer's right to access the Service ceases immediately. NEXUS will make Customer Data available for export for a period of thirty (30) days following termination, after which it may be permanently deleted.</p>
          </Section>

          <Section id="17" title="17. Force Majeure">
            <p>NEXUS shall not be liable for any failure or delay in performance caused by events beyond its reasonable control, including but not limited to natural disasters, war, terrorism, civil unrest, pandemics, government actions, internet outages, telecommunications failures, or third-party service provider outages.</p>
          </Section>

          <Section id="18" title="18. Governing Law and Dispute Resolution">
            <Subsection title="18.1 Governing Law">
              <p>These Terms shall be governed by and construed in accordance with the laws of the <strong className="text-white">State of Delaware, United States of America</strong>, without regard to its conflict of laws principles.</p>
            </Subsection>
            <Subsection title="18.2 Jurisdiction">
              <p>Any dispute arising out of or related to these Terms shall be resolved exclusively in the <strong className="text-white">state or federal courts located in Wilmington, Delaware</strong>, and the parties consent to the personal jurisdiction of such courts.</p>
            </Subsection>
            <Subsection title="18.3 Informal Resolution">
              <p>Before initiating formal proceedings, the parties agree to attempt in good faith to resolve any dispute through informal negotiation for a period of thirty (30) days.</p>
            </Subsection>
            <Subsection title="18.4 Waiver of Class Actions">
              <p>To the extent permitted by law, You agree that any disputes will be resolved on an individual basis, and You waive the right to participate in any class, collective, or representative action.</p>
            </Subsection>
          </Section>

          <Section id="19" title="19. Modifications to Terms">
            <p>NEXUS reserves the right to modify these Terms at any time. Material changes will be communicated via email or in-Service notification at least thirty (30) days before taking effect. Continued use of the Service after the effective date constitutes Your acceptance of the updated Terms.</p>
          </Section>

          <Section id="20" title="20. Assignment">
            <p>NEXUS may assign or transfer its rights and obligations under these Terms to any successor entity, including in connection with a merger, acquisition, or sale of assets. Customer may not assign these Terms without NEXUS's prior written consent.</p>
          </Section>

          <Section id="21" title="21. Severability">
            <p>If any provision of these Terms is found to be invalid or unenforceable, that provision shall be modified to the minimum extent necessary to be enforceable, and the remaining provisions shall remain in full force and effect.</p>
          </Section>

          <Section id="22" title="22. Entire Agreement">
            <p>These Terms, together with the Privacy Policy and any plan-specific addenda, constitute the entire agreement between You and NEXUS regarding the Service and supersede all prior agreements, understandings, and communications.</p>
          </Section>

          <Section id="23" title="23. Contact">
            <p>For questions, support, or notices regarding these Terms, please contact:</p>
            <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm">
              <p className="font-semibold text-white">NEXUS AI Consultancy</p>
              <p className="text-slate-400">Email: <a href="mailto:sales@nexusconsultancy.app" className="text-teal-400 hover:underline">sales@nexusconsultancy.app</a></p>
            </div>
          </Section>

          <div className="mt-12 rounded-xl border border-teal-500/20 bg-teal-500/5 p-5 text-sm text-slate-400">
            By using the Service, You acknowledge that You have read, understood, and agree to be bound by these Terms.
          </div>
        </div>

        <div className="mt-12 flex gap-4 border-t border-slate-800 pt-8 text-sm">
          <Link href="/legal/privacy" className="text-teal-400 hover:underline">
            Privacy Policy &rarr;
          </Link>
        </div>
      </main>
    </div>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={`section-${id}`} className="mb-10 scroll-mt-20">
      <h2 className="mb-4 text-xl font-bold text-white">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-400">{children}</div>
    </section>
  )
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="mb-1.5 text-sm font-semibold text-slate-300">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}
