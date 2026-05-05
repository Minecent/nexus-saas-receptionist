import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — NEXUS AI Consultancy',
  description: 'Privacy Policy for NEXUS AI Consultancy. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-slate-400">
            <strong className="text-slate-300">Effective Date:</strong> January 1, 2026 &nbsp;&middot;&nbsp;
            <strong className="text-slate-300">Last Updated:</strong> March 1, 2026
          </p>
        </div>

        <div className="mb-10 rounded-xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400 leading-relaxed">
          <p>NEXUS AI Consultancy ("NEXUS," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you entrust to us. This Privacy Policy explains how we collect, use, store, share, and protect your personal information when you access or use our AI-powered virtual receptionist platform (including "AVA"), automation services, websites, and related offerings (collectively, the "Service").</p>
          <p className="mt-3">By accessing or using the Service, you acknowledge that you have read and understood this Privacy Policy. For questions, contact us at <a href="mailto:privacy@nexus.ai" className="text-teal-400 hover:underline">privacy@nexus.ai</a>.</p>
        </div>

        <div>
          <Section id="1" title="1. Scope and Roles">
            <Subsection title="1.1 Two Types of Data">
              <p>NEXUS processes two categories of personal information:</p>
              <p><strong className="text-slate-300">(a) Customer Account Data</strong> — information about the businesses and individuals who subscribe to the Service. NEXUS acts as a <strong className="text-slate-300">data controller</strong> with respect to this information.</p>
              <p><strong className="text-slate-300">(b) End-User Data</strong> — information about callers, contacts, and other individuals whose personal information is processed through the Service on behalf of Customers (e.g., a caller's voice, name, and inquiry captured during an AVA call). NEXUS acts as a <strong className="text-slate-300">data processor</strong> with respect to this information; the Customer is the data controller.</p>
            </Subsection>
            <Subsection title="1.2 Customer Responsibilities">
              <p>Customers are responsible for ensuring they have a lawful basis (consent, contract, legitimate interest, etc.) to process End-User Data and for providing appropriate privacy notices to their callers and contacts.</p>
            </Subsection>
          </Section>

          <Section id="2" title="2. Information We Collect">
            <Subsection title="2.1 Information You Provide Directly">
              <p><strong className="text-slate-300">Account Registration:</strong> Full name, business name, email address, phone number, billing address, payment information (processed by our third-party payment processor; NEXUS does not store full card numbers).</p>
              <p><strong className="text-slate-300">Service Configuration:</strong> Business details (industry, hours, location), agent configurations (voice persona, greeting scripts, instructions), integration credentials, custom workflows and automation rules.</p>
              <p><strong className="text-slate-300">Communications:</strong> Support requests, feedback, and any correspondence with NEXUS.</p>
            </Subsection>
            <Subsection title="2.2 Information Collected Automatically">
              <p><strong className="text-slate-300">Usage Data:</strong> Login times, feature usage, dashboard activity, call volume, call duration, call timestamps, Subscription tier, Minute consumption, overage events.</p>
              <p><strong className="text-slate-300">Device and Technical Data:</strong> IP address, approximate geographic location (country/city level), browser type and version, operating system, device identifiers, referring URLs, language preferences.</p>
              <p><strong className="text-slate-300">Cookies:</strong> Session cookies for authentication, analytics cookies for performance monitoring, preference cookies for user experience. You can manage cookies via your browser settings.</p>
            </Subsection>
            <Subsection title="2.3 End-User Data Processed Through the Service">
              <p>When the Service handles calls on behalf of a Customer, the following information may be collected: caller phone number (Caller ID), voice audio recordings, call transcripts, information voluntarily provided by the caller (name, reason for call, scheduling details, contact details), and call metadata (duration, time, routing decisions, outcomes).</p>
            </Subsection>
            <Subsection title="2.4 Information from Third Parties">
              <p>Integrated services (e.g., calendar platforms, CRM systems, communication tools) provide data we need to deliver functionality. Payment processors provide transaction confirmations and dispute information. Authentication providers provide profile information consistent with their privacy policies.</p>
            </Subsection>
          </Section>

          <Section id="3" title="3. How We Use Information">
            <Subsection title="3.1 Service Delivery">
              <p>Operate, maintain, and provide the Service; authenticate users and secure accounts; process calls, schedule appointments, and execute automation workflows; provide customer support.</p>
            </Subsection>
            <Subsection title="3.2 Billing and Account Management">
              <p>Process payments and manage Subscriptions; apply overage charges (with Customer approval, per Terms of Service); send billing notifications and receipts.</p>
            </Subsection>
            <Subsection title="3.3 Service Improvement">
              <p>Diagnose technical issues and monitor performance; analyze usage trends; train and improve AI models in <strong className="text-slate-300">aggregated and anonymized</strong> form.</p>
            </Subsection>
            <Subsection title="3.4 Communications">
              <p>Send Service updates, security alerts, and administrative notices; respond to support requests; with consent, send marketing communications (you may opt out at any time).</p>
            </Subsection>
            <Subsection title="3.5 Legal and Safety">
              <p>Detect, prevent, and investigate fraud, abuse, or security incidents; enforce our Terms of Service; comply with legal obligations; protect the rights, safety, and property of NEXUS, our users, and third parties.</p>
            </Subsection>
            <Subsection title="3.6 Legal Bases (EU/EEA, UK)">
              <p>We rely on the following legal bases under the GDPR: <strong className="text-slate-300">Contract</strong> — to deliver the Service you have signed up for; <strong className="text-slate-300">Consent</strong> — for marketing communications and certain cookies; <strong className="text-slate-300">Legitimate interests</strong> — for fraud prevention, Service improvement, and analytics; <strong className="text-slate-300">Legal obligation</strong> — to comply with applicable laws.</p>
            </Subsection>
          </Section>

          <Section id="4" title="4. How We Share Information">
            <p className="font-semibold text-white">We do not sell personal information.</p>
            <Subsection title="4.1 Service Providers (Sub-processors)">
              <p>We share information with carefully vetted third-party service providers that support our operations under strict contractual confidentiality and data protection obligations. These providers fall into the following categories: cloud hosting and infrastructure, voice and communications infrastructure, AI and language processing, workflow automation, payment processing, analytics and monitoring, and customer support platforms.</p>
              <p>All sub-processors are bound by data protection terms consistent with this Privacy Policy and applicable law (including GDPR-compliant Data Processing Agreements and Standard Contractual Clauses where required). A list of sub-processor categories is available to enterprise Customers upon request.</p>
            </Subsection>
            <Subsection title="4.2 Customers (End-User Data)">
              <p>End-User Data captured through calls is shared with the Customer who operates the AVA agent that handled the call. Customers are responsible for further use and protection of that data.</p>
            </Subsection>
            <Subsection title="4.3 Legal and Regulatory Disclosures">
              <p>We may disclose information when required by law, court order, subpoena, or other legal process, or when we believe in good faith that disclosure is necessary to comply with legal obligations, protect safety, investigate fraud, or cooperate with law enforcement.</p>
            </Subsection>
            <Subsection title="4.4 Business Transfers">
              <p>In the event of a merger, acquisition, financing, reorganization, bankruptcy, or sale of assets, personal information may be transferred to the successor entity. We will notify you of any such transfer affecting your information.</p>
            </Subsection>
            <Subsection title="4.5 With Your Consent">
              <p>We may share information for any other purpose with your explicit consent.</p>
            </Subsection>
          </Section>

          <Section id="5" title="5. International Data Transfers">
            <p>NEXUS operates across multiple jurisdictions. Your information may be transferred to, stored in, and processed in countries other than the country in which you reside.</p>
            <p>For transfers from the European Economic Area (EEA), United Kingdom, or Switzerland to countries that have not received an adequacy decision, we rely on Standard Contractual Clauses (SCCs) approved by the European Commission and equivalent contractual safeguards with our sub-processors.</p>
          </Section>

          <Section id="6" title="6. Data Retention">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="py-2 pr-4 text-left font-semibold text-slate-300">Data Type</th>
                    <th className="py-2 text-left font-semibold text-slate-300">Retention Period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    ['Account information', 'Duration of Subscription + 12 months after termination'],
                    ['Call recordings', '30–90 days, depending on Subscription tier'],
                    ['Call transcripts and metadata', '24 months'],
                    ['Billing records', '7 years (tax and audit compliance)'],
                    ['Support communications', '24 months'],
                    ['Marketing data', 'Until consent is withdrawn'],
                  ].map(([type, period]) => (
                    <tr key={type}>
                      <td className="py-2 pr-4 text-slate-400">{type}</td>
                      <td className="py-2 text-slate-400">{period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>After retention periods expire, data is deleted or anonymized, except where longer retention is required by law. Customers may request earlier deletion by contacting <a href="mailto:privacy@nexus.ai" className="text-teal-400 hover:underline">privacy@nexus.ai</a>.</p>
          </Section>

          <Section id="7" title="7. Data Security">
            <p>We implement reasonable administrative, technical, and physical safeguards to protect personal information, including: encryption of data in transit (TLS) and at rest where applicable; access controls and authentication; regular security reviews and monitoring; employee training on data protection; and incident response procedures.</p>
            <p>No system is completely secure. In the event of a confirmed data breach affecting your personal information, we will notify you and applicable authorities as required by law.</p>
          </Section>

          <Section id="8" title="8. Your Rights">
            <Subsection title="8.1 Universal Rights">
              <ul className="space-y-1.5 pl-4">
                {[
                  ['Access', 'request a copy of the personal information we hold about you'],
                  ['Correction', 'request correction of inaccurate or incomplete information'],
                  ['Deletion', 'request deletion of your personal information (subject to legal exceptions)'],
                  ['Opt-out of marketing', 'unsubscribe from promotional communications at any time'],
                ].map(([right, desc]) => (
                  <li key={right} className="flex gap-2">
                    <span className="text-teal-400 shrink-0">&bull;</span>
                    <span><strong className="text-slate-300">{right}</strong> — {desc}</span>
                  </li>
                ))}
              </ul>
            </Subsection>
            <Subsection title="8.2 Additional Rights (EU/EEA, UK, Switzerland — GDPR)">
              <ul className="space-y-1.5 pl-4">
                {[
                  ['Restriction', 'request that we limit processing of your information'],
                  ['Portability', 'receive your information in a structured, machine-readable format'],
                  ['Objection', 'object to processing based on legitimate interests'],
                  ['Withdraw consent', 'without affecting prior lawful processing'],
                  ['Lodge a complaint', 'file a complaint with your local supervisory authority (in the Netherlands: Autoriteit Persoonsgegevens)'],
                ].map(([right, desc]) => (
                  <li key={right} className="flex gap-2">
                    <span className="text-teal-400 shrink-0">&bull;</span>
                    <span><strong className="text-slate-300">{right}</strong> — {desc}</span>
                  </li>
                ))}
              </ul>
            </Subsection>
            <Subsection title="8.3 California Residents (CCPA/CPRA)">
              <p>California residents have additional rights, including: the right to know what personal information is collected, used, and shared; the right to delete personal information; the right to correct inaccurate personal information; the right to opt out of the sale or sharing of personal information (NEXUS does not sell personal information); and the right to non-discrimination for exercising privacy rights.</p>
            </Subsection>
            <Subsection title="8.4 How to Exercise Your Rights">
              <p>Contact us at <a href="mailto:privacy@nexus.ai" className="text-teal-400 hover:underline">privacy@nexus.ai</a>. We may need to verify your identity before fulfilling your request. We will respond within the timeframes required by applicable law (typically 30 days under GDPR; 45 days under CCPA, extendable by 45 additional days).</p>
              <p>If you are an end user (caller) whose data was processed through a Customer's AVA agent, please contact the Customer directly first, as they are the data controller for that information.</p>
            </Subsection>
          </Section>

          <Section id="9" title="9. AI and Automated Processing">
            <p>The Service uses artificial intelligence and machine learning to generate voice responses and conversation, transcribe audio to text, make routing and scheduling decisions, and detect spam, abuse, or security threats.</p>
            <Subsection title="9.1 AI Model Training">
              <p>NEXUS may use <strong className="text-slate-300">aggregated and anonymized</strong> data to improve the Service's performance and reliability. We do not use identifiable Customer Data or End-User Data to train AI models operated by third parties without explicit consent or contractual permission.</p>
            </Subsection>
            <Subsection title="9.2 Right to Human Review">
              <p>For decisions that produce significant effects on you and are based solely on automated processing (in jurisdictions where this right applies), you have the right to request human review. Contact <a href="mailto:privacy@nexus.ai" className="text-teal-400 hover:underline">privacy@nexus.ai</a> to request review.</p>
            </Subsection>
          </Section>

          <Section id="10" title="10. Children's Privacy">
            <p>The Service is not directed at children under the age of 18 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect personal information from minors. If we become aware that we have collected information from a minor, we will delete it promptly. If you believe a minor has provided us with personal information, contact us at <a href="mailto:privacy@nexus.ai" className="text-teal-400 hover:underline">privacy@nexus.ai</a>.</p>
          </Section>

          <Section id="11" title="11. Third-Party Links and Services">
            <p>The Service may contain links to third-party websites or integrate with third-party services (e.g., calendar platforms, communication tools, CRM platforms). NEXUS is not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before sharing information with them.</p>
          </Section>

          <Section id="12" title="12. Cookies and Tracking Technologies">
            <p>We use cookies and similar technologies for: <strong className="text-slate-300">Strictly necessary</strong> — authentication, security, and core functionality; <strong className="text-slate-300">Performance</strong> — analytics and error monitoring; <strong className="text-slate-300">Functionality</strong> — remembering preferences; <strong className="text-slate-300">Marketing</strong> (with consent only) — measuring campaign effectiveness.</p>
            <p>You can manage cookie preferences via our cookie banner (where required by law), your browser settings, or opt-out tools provided by third-party analytics networks. Disabling certain cookies may limit Service functionality.</p>
          </Section>

          <Section id="13" title="13. Call Recording and Consent">
            <p>The Service may record calls handled by AVA. Call recording laws vary by jurisdiction — most U.S. states and most countries require only one-party consent, while some require all-party consent.</p>
            <p className="font-semibold text-white">The Customer (the business operating the AVA agent) is solely responsible for obtaining any required consent from callers under applicable laws and for enabling appropriate consent disclosures within the Service.</p>
            <p>NEXUS provides tools to support consent capture (e.g., greeting disclosures), but the legal obligation rests with the Customer.</p>
          </Section>

          <Section id="14" title="14. Changes to This Privacy Policy">
            <p>We may update this Privacy Policy from time to time. Material changes will be communicated via email or in-Service notification at least 30 days before taking effect. The "Last Updated" date at the top of this policy reflects the most recent revision. Your continued use of the Service after changes take effect constitutes acceptance of the updated Privacy Policy.</p>
          </Section>

          <Section id="15" title="15. Contact Us">
            <p>For privacy-related questions, requests, or complaints:</p>
            <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm">
              <p className="font-semibold text-white">NEXUS AI Consultancy — Privacy Officer</p>
              <p className="text-slate-400">Email: <a href="mailto:privacy@nexus.ai" className="text-teal-400 hover:underline">privacy@nexus.ai</a></p>
              <p className="mt-3 text-slate-500 text-xs">
                <strong className="text-slate-400">EU/EEA users:</strong> You have the right to lodge a complaint with your local supervisory authority. In the Netherlands, this is the{' '}
                <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                  Autoriteit Persoonsgegevens
                </a>.
              </p>
            </div>
          </Section>
        </div>

        <div className="mt-12 flex gap-4 border-t border-slate-800 pt-8 text-sm">
          <Link href="/legal/terms" className="text-teal-400 hover:underline">
            Terms of Service &rarr;
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
