
import React from 'react';
import TermsOfServiceHeader from '../components/TermsOfServiceHeader';
import TermsOfServiceItem from '../components/TermsOfServiceItem';
import { useHeader } from '../hooks/headerHook';

export default function PrivacyPolicy() {

  useHeader({ 
    title: `Privacy Policy - Dailyneeds`,
    headerTitle: '_extra.Privacy_policy'
  });

  return (
    <section>
      <div className="container-x">

        <TermsOfServiceHeader title="PRIVACY POLICY FOR DAILYNEEDS" date="Last updated [Nov 25th, 2021]" />

        <dl className="my-5 md:max-w-2xl md:mx-auto">
          
          <TermsOfServiceItem 
            heading="INTRODUCTION" 
            body={[
              "DAILYNEEDS (“we” or “us” or “our”) respects the privacy of our users (“user” or “you”). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and our mobile applications, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site. ",
              "We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the “Last Updated” date of this Privacy Policy. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the Site, and you waive the right to receive specific notice of each such change or modification. ",
              "You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Site after the date such revised Privacy Policy is posted. ",
            ]}
            />

          <TermsOfServiceItem 
            heading="COLLECTION OF YOUR INFORMATION" 
            body={[
              "We may collect information about you in a variety of ways. The information we may collect on the Site includes:",
              { head: "Personal Data" },
              "Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or our mobile applications, or when you choose to participate in various activities related to the Site and our mobile applications, such as online chat and message boards. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site and our mobile applications.",
              { head: 'Derivative Data ' },
              'Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site. If you are using our mobile application, this information may also include your device name and type, your operating system, your phone number, your country, your likes and replies to a post, and other interactions with the application and other users via server log files, as well as any other information you choose to provide.',
              { head: 'Financial Data ' },
              'Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site or our mobile applications. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processors: PayStack, Flutterwave and you are encouraged to review their privacy policy and contact them directly for responses to your questions.',
              { head: 'Facebook Permissions' },
              'The Site and our mobile applications may by default access your Facebook basic account information, including your name, email, gender, birthday, current city, and profile picture URL, as well as other information that you choose to make public. We may also request access to other permissions related to your account, such as friends, check-ins, and likes, and you may choose to grant or deny us access to each individual permission. For more information regarding Facebook permissions, refer to the Facebook Permissions Reference page.',
              { head: 'Data From Social Networks ' },
              'User information from social networking sites, such as Apple’s Game Center, Facebook, Google+, Instagram, Pinterest, Twitter including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks. If you are using our mobile application, this information may also include the contact information of anyone you invite to use and/or join our mobile application.',
              { head: 'Mobile Device Data ' },
              'Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the Site from a mobile device.',
              { head: 'Third-Party Data ' },
              'Information from third parties, such as personal information or network friends, if you connect your account to the third party and grant the Site permission to access this information.',
              { head: 'Data from Contests, Giveaways, and Surveys ' },
              'Personal and other information you may provide when entering contests or giveaways and/or responding to surveys.',
              { head: 'Mobile Application Information' },
              'If you connect using our mobile application:',
              [
                'Geo-Location Information. We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using our mobile application, to provide location-based services. If you wish to change our access or permissions, you may do so in your device’s settings.',
                'Mobile Device Access. We may request access or permission to certain features from your mobile device, including your mobile device’s Bluetooth, calendar, camera, contacts, microphone, reminders, sensors, SMS messages, social media accounts, storage and other features. If you wish to change our access or permissions, you may do so in your device’s settings.',
                'Mobile Device Data. We may collect device information such as your mobile device ID, model and manufacturer, operating system, version information and IP address.',
                'Push Notifications. We may request to send you push notifications regarding your account or the Application. If you wish to opt-out from receiving these types of communications, you may turn them off in your device’s settings.',
              ],
            ]}
            />

          <TermsOfServiceItem 
            heading="USE OF YOUR INFORMATION" 
            body={[
              "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site or our mobile application to: ",
              [
                'Administer sweepstakes, promotions, and contests. ',
                'Assist law enforcement and respond to subpoena.',
                'Compile anonymous statistical data and analysis for use internally or with third parties. ',
                'Create and manage your account.',
                'Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site and our mobile applications to you. ',
                'Email you regarding your account or order.',
                'Enable user-to-user communications.',
                'Fulfill and manage purchases, orders, payments, and other transactions related to the Site and our mobile applications.',
                'Generate a personal profile about you to make future visits to the Site and our mobile applications more personalized.',
                'Increase the efficiency and operation of the Site and our mobile applications.',
                'Monitor and analyze usage and trends to improve your experience with the Site and our mobile applications.',
                'Notify you of updates to the Site and our mobile applications.',
                'Offer new products, services, [mobile applications,] and/or recommendations to you.',
                'Perform other business activities as needed.',
                'Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.',
                'Process payments and refunds.',
                'Request feedback and contact you about your use of the Site and our mobile applications. ',
                'Resolve disputes and troubleshoot problems.',
                'Respond to product and customer service requests.',
                'Send you a newsletter.',
                'Solicit support for the Site and our mobile applications.',
              ],
            ]}
            />

          <TermsOfServiceItem 
            heading="DISCLOSURE OF YOUR INFORMATION" 
            body={[
              "We may share information we have collected about you in certain situations. Your information may be disclosed as follows:  ",
              { head: 'By Law or to Protect Rights ' },
              'If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation. This includes exchanging information with other entities for fraud protection and credit risk reduction.',
              { head: 'Third-Party Service Providers ' },
              'We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.  ',
              { head: 'Marketing Communications' },
              'With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.',
              { head: 'Interactions with Other Users ' },
              'If you interact with other users of the Site and our mobile applications, those users may see your name, profile photo, and descriptions of your activity, including sending invitations to other users, chatting with other users, liking posts, following blogs. ',
              { head: 'Online Postings' },
              'When you post comments, contributions or other content to the Site or our mobile applications, your posts may be viewed by all users and may be publicly distributed outside the Site and our mobile applications in perpetuity. ',
              { head: 'Third-Party Advertisers ' },
              'We may use third-party advertising companies to serve ads when you visit the Site or our mobile applications. These companies may use information about your visits to the Site and our mobile applications and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you. ',
              { head: 'Affiliates ' },
              'We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.',
              { head: 'Business Partners ' },
              'We may share your information with our business partners to offer you certain products, services or promotions. ',
              { head: 'Offer Wall  ' },
              'Our mobile application may display a third-party hosted “offer wall.” Such an offer wall allows third-party advertisers to offer virtual currency, gifts, or other items to users in return for acceptance and completion of an advertisement offer. Such an offer wall may appear in our mobile application and be displayed to you based on certain data, such as your geographic area or demographic information. When you click on an offer wall, you will leave our mobile application. A unique identifier, such as your user ID, will be shared with the offer wall provider in order to prevent fraud and properly credit your account.',
              { head: 'Social Media Contacts  ' },
              'If you connect to the Site or our mobile applications through a social network, your contacts on the social network will see your name, profile photo, and descriptions of your activity.',
              { head: 'Other Third Parties' },
              'We may share your information with advertisers and investors for the purpose of conducting general business analysis. We may also share your information with such third parties for marketing purposes, as permitted by law. ',
              { head: 'Sale or Bankruptcy ' },
              'If we reorganize or sell all or a portion of our assets, undergo a merger, or are acquired by another entity, we may transfer your information to the successor entity. If we go out of business or enter bankruptcy, your information would be an asset transferred or acquired by a third party. You acknowledge that such transfers may occur and that the transferee may decline honor commitments we made in this Privacy Policy. We are not responsible for the actions of third parties with whom you share personal or sensitive data, and we have no authority to manage or control third-party solicitations. If you no longer wish to receive correspondence, emails or other communications from third parties, you are responsible for contacting the third party directly.',
            ]}
            />

          <TermsOfServiceItem 
            heading="TRACKING TECHNOLOGIES" 
            body={[
              { head: 'Cookies and Web Beacons' },
              'We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site and our mobile applications to help customize the Site and our mobile applications and improve your experience. When you access the Site or our mobile applications, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site or our mobile applications. You may not decline web beacons. However, they can be rendered ineffective by declining all cookies or by modifying your web browser’s settings to notify you each time a cookie is tendered, permitting you to accept or decline cookies on an individual basis. For more information on how we use cookies, please refer to our Cookie Policy posted on the Site, which is incorporated into this Privacy Policy. By using the Site, you agree to be bound by our Cookie Policy.',
              { head: 'Internet-Based Advertising' },
              'Additionally, we may use third-party software to serve ads on the Site and our mobile applications, implement email marketing campaigns, and manage other interactive marketing initiatives. This third-party software may use cookies or similar tracking technology to help manage and optimize your online experience with us. For more information about opting-out of interest-based ads, visit the Network Advertising Initiative Opt-Out Tool or Digital Advertising Alliance Opt-Out Tool.',
              { head: 'Website Analytics ' },
              'We may also partner with selected third-party vendors such as  Google Analytics and others to allow tracking technologies and remarketing services on the Site and our mobile applications through the use of first party cookies and third-party cookies, to, among other things, analyze and track users’ use of the Site and our mobile applications , determine the popularity of certain content and better understand online activity. By accessing the Site and our mobile applications, you consent to the collection and use of your information by these third-party vendors. You are encouraged to review their privacy policy and contact them directly for responses to your questions. We do not transfer personal information to these third-party vendors. However, if you do not want any information to be collected and used by tracking technologies, you can visit the third-party vendor or the Network Advertising Initiative Opt-Out Tool or Digital Advertising Alliance Opt-Out Tool.',

              "You should be aware that getting a new computer, installing a new browser, upgrading an existing browser, or erasing or otherwise altering your browser’s cookies files may also clear certain opt-out cookies, plug-ins, or settings."
            ]}
            />

          <TermsOfServiceItem 
            heading="THIRD-PARTY WEBSITES" 
            body={[
              "The Site and our mobile applications may contain links to third-party websites and applications of interest, including advertisements and external services that are not affiliated with us. Once you have used these links to leave the Site or our mobile applications, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices (if any) of the third party responsible for that website, and should take those steps necessary to, in your discretion, protect the privacy of your information. We are not responsible for the content or privacy and security practices and policies of any third parties, including other sites, services or applications that may be linked to or from the Site or our mobile applications.",
            ]}
            />

          <TermsOfServiceItem 
            heading="SECURITY OF YOUR INFORMATION" 
            body={[
              "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.",
            ]}
            />

          <TermsOfServiceItem 
            heading="POLICY FOR CHILDREN" 
            body={[
              "We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below. ",
            ]}
            />

          <TermsOfServiceItem 
            heading="CONTROLS FOR DO-NOT-TRACK FEATURES" 
            body={[
              "Most web browsers and some mobile operating systems [and our mobile applications] include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy. Most web browsers and some mobile operating systems [and our mobile applications] include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. If you set the DNT signal on your browser, we will respond to such DNT browser signals. ",
            ]}
            />

          <TermsOfServiceItem 
            heading="OPTIONS REGARDING YOUR INFORMATION" 
            body={[
              { head: 'Account Information', },
              'You may at any time review or change the information in your account or terminate your account by:',
              [
                'Logging into your account settings and updating your account',
                'Contacting us using the contact information provided below',
                'Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.',
              ],

              { head: 'Emails and Communications' },
              'If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:',
              [
                'Noting your preferences at the time you register your account with the Site or our mobile applications',
                'Logging into your account settings and updating your preferences.',
                'Contacting us using the contact information provided below',
              ],

              'If you no longer wish to receive correspondence, emails, or other communications from third parties, you are responsible for contacting the third party directly. '
            ]}
            />

          <TermsOfServiceItem 
            heading="CONTACT US" 
            body={[
              'If you have questions or comments about this Privacy Policy, please contact us at:',
              "Dailyneeds",
              "Owerri, Imo State",
              "+234806470889",
              "dailyneeds785@gmail.com"
            ]}
            />

        </dl>
      </div>
    </section>
  );
}
