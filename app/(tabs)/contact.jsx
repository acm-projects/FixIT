import React from 'react';
import { ScrollView, YStack, Text } from 'tamagui';
import ContactComp from '../../components/contactComp.jsx'; // Adjust the path as needed

const departments = [
  { name: 'Admissions / Enrollment Services', phone: '972-883-2270', email: 'gradapp@utdallas.edu', link: 'https://enroll.utdallas.edu/' },
  { name: 'Arts & Humanities (A&H)', phone: '972-883-6780', email: null, link: 'https://sites.utdallas.edu/ah/about-ah/' },
  { name: 'Arts & Performance', phone: '972-883-2552', email: null, link: 'https://aht.utdallas.edu/events/ticket-policy/' },
  { name: 'Arts, Technology, & Emerging Communication (ATEC)', phone: '972-883-4376', email: null, link: 'https://aht.utdallas.edu/degrees/undergraduate-degrees/arts-technology-and-emerging-communication/' },
  { name: 'Athletics', phone: '972-883-4499', email: null, link: 'https://utdcomets.com/staff-directory' },
  { name: 'Behavioral & Brain Sciences (BBS)', phone: '972-883-2355', email: null, link: 'https://www.utdallas.edu/bbs/BBS' },
  { name: 'Accounts Payable / Procurement Management', phone: '972-883-2300', email: 'onecard@utdallas.edu', link: 'https://www.utdallas.edu/procurementProcurement' },
  { name: 'Ackerman Center for Holocaust Studies', phone: '972-883-2100', email: null, link: 'https://www.utdallas.edu/ackerman/Ackerman' },
  { name: 'Alan G. MacDiarmid NanoTech Institute', phone: '972-883-6530', email: null, link: 'https://centers.utdallas.edu/nanotech/NanoTech' },
  { name: 'Apogee Internet & TV', phone: '855-465-6750', email: null, link: 'https://www.myresnet.com/home' },
  { name: 'Bookstore', phone: '972-883-2665', email: null, link: 'https://www.bkstr.com/texasatdallasstore/homeBookstore' },
  { name: 'Budget & Finance', phone: '972-883-4802', email: null, link: 'https://finance.utdallas.edu/' },
  { name: 'Bursar', phone: '972-883-2612', email: null, link: 'https://bursar.utdallas.edu/' },
  { name: 'Callier Center', phone: '972-883-3630', email: null, link: 'https://calliercenter.utdallas.edu/' },
  { name: 'Career Center', phone: '972-883-2943', email: null, link: 'https://career.utdallas.edu/' },
  { name: 'Center for Brain Health', phone: '214-905-3007', email: null, link: 'https://centerforbrainhealth.org/' },
  { name: 'Center for Computer Science Education & Outreach', phone: '972-357-6893', email: 'csk12@utdallas.edu', link: 'https://k12.utdallas.edu/' },
  { name: 'Center for Students in Recovery', phone: '972-883-7320', email: 'recovery@utdallas.edu', link: 'https://recovery.utdallas.edu/' },
  { name: 'Center for Translation Studies', phone: '972-883-2092', email: null, link: 'https://translation.utdallas.edu/' },
  { name: 'Center for Vital Longevity (CVL)', phone: '972-883-3200', email: null, link: 'https://www.cvl.utdallas.edu/' }
];

const Contact = () => {
  return (
    <ScrollView flex={1} backgroundColor="#E4D3BA" padding={20}>
      <Text fontSize={28} fontWeight="bold" color="#23603F" textAlign="center" marginBottom={30}>
        Contact Us
      </Text>

      {/* Address Section */}
      <YStack marginBottom={20}>
        <Text fontSize={16} fontWeight="bold" color="#23603F">Address:</Text>
        <Text fontSize={16} color="#444">800 W. Campbell Road, SP2 Richardson, Texas 75080-30215</Text>
      </YStack>

      {/* Departments Section */}
      <Text fontSize={22} fontWeight="bold" color="#23603F" marginBottom={20}>Departments</Text>
      {departments
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((department, index) => (
          <ContactComp
            key={index}
            name={department.name}
            phone={department.phone}
            email={department.email}
            link={department.link}
          />
      ))}
    </ScrollView>
  );
};

export default Contact;
