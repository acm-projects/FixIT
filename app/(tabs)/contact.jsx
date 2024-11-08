import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Card, Divider } from '@rneui/themed';
import ContactComp from '../../components/contactComp.jsx';
import tw from 'twrnc';

// Move departments data outside component to prevent unnecessary re-creation
const departments = [
  {
    name: 'Admissions / Enrollment Services',
    phone: '972-883-2270',
    email: 'gradapp@utdallas.edu',
    link: 'https://enroll.utdallas.edu/',
  },
  {
    name: 'Arts & Humanities (A&H)',
    phone: '972-883-6780',
    email: null,
    link: 'https://sites.utdallas.edu/ah/about-ah/',
  },
  {
    name: 'Arts & Performance',
    phone: '972-883-2552',
    email: null,
    link: 'https://aht.utdallas.edu/events/ticket-policy/',
  },
  {
    name: 'Arts, Technology, & Emerging Communication (ATEC)',
    phone: '972-883-4376',
    email: null,
    link: 'https://aht.utdallas.edu/degrees/undergraduate-degrees/arts-technology-and-emerging-communication/',
  },
  {
    name: 'Athletics',
    phone: '972-883-4499',
    email: null,
    link: 'https://utdcomets.com/staff-directory',
  },
  {
    name: 'Behavioral & Brain Sciences (BBS)',
    phone: '972-883-2355',
    email: null,
    link: 'https://www.utdallas.edu/bbs/BBS',
  },
  {
    name: 'Accounts Payable / Procurement Management',
    phone: '972-883-2300',
    email: 'onecard@utdallas.edu',
    link: 'https://www.utdallas.edu/procurementProcurement',
  },
  {
    name: 'Ackerman Center for Holocaust Studies',
    phone: '972-883-2100',
    email: null,
    link: 'https://www.utdallas.edu/ackerman/Ackerman',
  },
  {
    name: 'Alan G. MacDiarmid NanoTech Institute',
    phone: '972-883-6530',
    email: null,
    link: 'https://centers.utdallas.edu/nanotech/NanoTech',
  },
  {
    name: 'Apogee Internet & TV',
    phone: '855-465-6750',
    email: null,
    link: 'https://www.myresnet.com/home',
  },
  {
    name: 'Bookstore',
    phone: '972-883-2665',
    email: null,
    link: 'https://www.bkstr.com/texasatdallasstore/homeBookstore',
  },
  {
    name: 'Budget & Finance',
    phone: '972-883-4802',
    email: null,
    link: 'https://finance.utdallas.edu/',
  },
  {
    name: 'Bursar',
    phone: '972-883-2612',
    email: null,
    link: 'https://bursar.utdallas.edu/',
  },
  {
    name: 'Callier Center',
    phone: '972-883-3630',
    email: null,
    link: 'https://calliercenter.utdallas.edu/',
  },
  {
    name: 'Career Center',
    phone: '972-883-2943',
    email: null,
    link: 'https://career.utdallas.edu/',
  },
  {
    name: 'Center for Brain Health',
    phone: '214-905-3007',
    email: null,
    link: 'https://centerforbrainhealth.org/',
  },
  {
    name: 'Center for Computer Science Education & Outreach',
    phone: '972-357-6893',
    email: 'csk12@utdallas.edu',
    link: 'https://k12.utdallas.edu/',
  },
  {
    name: 'Center for Students in Recovery',
    phone: '972-883-7320',
    email: 'recovery@utdallas.edu',
    link: 'https://recovery.utdallas.edu/',
  },
  {
    name: 'Center for Translation Studies',
    phone: '972-883-2092',
    email: null,
    link: 'https://translation.utdallas.edu/',
  },
  {
    name: 'Center for Vital Longevity (CVL)',
    phone: '972-883-3200',
    email: null,
    link: 'https://www.cvl.utdallas.edu/',
  }
];

const Contact = () => {
  // Sort departments once during render
  const sortedDepartments = React.useMemo(
    () => departments.sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  return (
    <ScrollView style={tw`flex-1 bg-[#E4D3BA] p-5`}>
      {/* Title */}
      <Text 
        h1 
        style={tw`text-l font-bold text-[#23603F] text-center mb-8`}
      >
        Contact Us
      </Text>

      {/* Address Section */}
      <Card containerStyle={tw`bg-transparent border-0 p-0 mb-5`}>
        <Text style={tw`text-base font-bold text-[#23603F] mb-1`}>
          Address:
        </Text>
        <Text style={tw`text-base text-gray-700`}>
          800 W. Campbell Road, SP2 Richardson, Texas 75080-30215
        </Text>
      </Card>

      {/* Departments Section */}
      <Text 
        h2 
        style={tw`text-l font-bold text-[#23603F] mb-5`}
      >
        Departments
      </Text>

      <View>
        {sortedDepartments.map((department, index) => (
          <React.Fragment key={department.name}>
            <ContactComp
              name={department.name}
              phone={department.phone}
              email={department.email}
              link={department.link}
            />
            {index < sortedDepartments.length - 1 && (
              <Divider style={tw`my-2`} />
            )}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

export default Contact;