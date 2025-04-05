import Head from 'next/head';
import { useTheme } from '../context/ThemeContext';

export default function Privacy() {
  const { darkMode } = useTheme();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Head>
        <title>Privacy Policy | AICTE Jobs Portal</title>
        <meta name="description" content="Privacy Policy for AICTE Jobs Portal - Learn how we collect, use, and protect your personal information." />
      </Head>

      <main className="py-16">
        {/* Hero Section */}
        <div className="relative bg-indigo-800 dark:bg-indigo-900 transition-colors duration-300">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover opacity-20"
              src="/images/privacy-hero.jpg"
              alt="Privacy background"
            />
            <div className="absolute inset-0 bg-indigo-800 dark:bg-indigo-900 mix-blend-multiply" />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in">
              Privacy Policy
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl animate-fade-in-up">
              We value your privacy and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, and safeguard your data.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transition-colors duration-300">
            <div className="p-6 sm:p-10">
              <div className="prose prose-indigo dark:prose-invert max-w-none transition-colors duration-300 animate-fade-in">
                <h2>Introduction</h2>
                <p>
                  AICTE Jobs Portal ("we", "our", or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                  visit our website and use our services.
                </p>
                <p>
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
                  please do not access the site or use our services.
                </p>

                <h2>Information We Collect</h2>
                <p>
                  We collect information about you in various ways when you use our platform. 
                  This information may include:
                </p>
                <ul>
                  <li>
                    <strong>Personal Information:</strong> Name, email address, contact information, 
                    educational qualifications, work experience, skills, and other information you provide 
                    when creating a profile.
                  </li>
                  <li>
                    <strong>Authentication Information:</strong> Login credentials and authentication data.
                  </li>
                  <li>
                    <strong>Profile Information:</strong> Information you add to your profile including skills, 
                    interests, education, experience, certifications, and preferences.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you use our platform, including job searches, 
                    applications submitted, and interactions with mentors.
                  </li>
                  <li>
                    <strong>Technical Data:</strong> IP address, browser type, device information, cookie data, 
                    and other technical information.
                  </li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>
                  We use the information we collect for various purposes, including to:
                </p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and match you with relevant job opportunities</li>
                  <li>Generate AI-powered recommendations based on your profile and preferences</li>
                  <li>Communicate with you about our services, updates, and other information</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Protect against unauthorized access and potential fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2>Data Sharing and Disclosure</h2>
                <p>
                  We may share your information in the following situations:
                </p>
                <ul>
                  <li>
                    <strong>With Employers:</strong> When you apply for jobs, your profile information and 
                    application details will be shared with the relevant employers.
                  </li>
                  <li>
                    <strong>With Service Providers:</strong> We may share information with third-party vendors, 
                    service providers, and contractors who perform services on our behalf.
                  </li>
                  <li>
                    <strong>For Legal Compliance:</strong> We may disclose information if required to do so by law 
                    or in response to valid requests by public authorities.
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> We may share your information with other parties with your consent.
                  </li>
                </ul>

                <h2>AI and Algorithms</h2>
                <p>
                  Our platform uses artificial intelligence and algorithms to provide personalized job recommendations. 
                  These systems analyze your profile information, skills, interests, educational background, 
                  and experience to match you with relevant opportunities.
                </p>
                <p>
                  We are committed to ensuring that our AI systems operate fairly and without bias. 
                  We regularly review and improve our algorithms to enhance accuracy and prevent discrimination.
                </p>

                <h2>Data Security</h2>
                <p>
                  We have implemented appropriate technical and organizational security measures designed to protect 
                  the security of any personal information we process. However, please also remember that we cannot 
                  guarantee that the internet itself is 100% secure.
                </p>
                <p>
                  We use industry-standard encryption technologies when transferring and receiving consumer data exchanged 
                  with our site. We have appropriate security measures in place in our physical facilities to protect 
                  against the loss, misuse, or alteration of information that we have collected from you.
                </p>

                <h2>Your Data Protection Rights</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, such as:
                </p>
                <ul>
                  <li>The right to access personal information we hold about you</li>
                  <li>The right to request correction or deletion of your personal information</li>
                  <li>The right to object to processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us using the information provided in the "Contact Us" section.
                </p>

                <h2>Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our platform and hold certain information. 
                  Cookies are files with a small amount of data which may include an anonymous unique identifier.
                </p>
                <p>
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                  However, if you do not accept cookies, you may not be able to use some portions of our service.
                </p>

                <h2>Children's Privacy</h2>
                <p>
                  Our service is not intended for use by children under the age of 16. We do not knowingly collect 
                  personally identifiable information from children under 16. If you are a parent or guardian and 
                  you are aware that your child has provided us with personal information, please contact us.
                </p>

                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this 
                  Privacy Policy are effective when they are posted on this page.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul>
                  <li>By email: privacy@aictejobsportal.in</li>
                  <li>By visiting the Contact page on our website</li>
                  <li>By mail: Privacy Officer, AICTE Jobs Portal, Nelson Mandela Marg, Vasant Kunj, New Delhi, Delhi 110070, India</li>
                </ul>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 transition-colors duration-300">
                  Last Updated: June 1, 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 