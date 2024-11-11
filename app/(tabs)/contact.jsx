import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Animated } from 'react-native';
import { Text, Card, Divider } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import ContactComp from '../../components/contactComp.jsx';
import tw from 'twrnc';

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
  },
  {
    name: 'Central Receiving & Mail Services (CRMS)',
    phone: '972-883-2779',
    email: null,
    link: 'https://services.utdallas.edu/mail/',
  },
  {
    name: 'Chemistry & Biochemistry',
    phone: '972-883-2901',
    email: null,
    link: 'https://chemistry.utdallas.edu/',
  },
  {
    name: 'Comet Calendar',
    phone: '972-883-4995',
    email: null,
    link: 'https://calendar.utdallas.edu/',
  },
  {
    name: 'Comet Card Office',
    phone: '972-883-2495',
    email: null,
    link: 'https://cometcard.utdallas.edu/',
  },
  {
    name: 'Communications / Media Relations / Periodicals',
    phone: '972-883-2155',
    email: null,
    link: 'https://www.utdallas.edu/communications/contact-us/',
  },
  {
    name: 'Confucius Institute',
    phone: '972-883-4860',
    email: null,
    link: 'https://asianstudies.utdallas.edu/',
  },
  {
    name: 'Corporate Relations',
    phone: '972-883-5387',
    email: null,
    link: 'https://development.utdallas.edu/about/corporate-relations/',
  },
  {
    name: 'Davidson-Gundy Alumni Center',
    phone: '972-883-5393',
    email: 'dgac@utdallas.edu',
    link: 'https://davidson-gundy.utdallas.edu/',
  },
  {
    name: 'Dean of Students',
    phone: '972-883-6391',
    email: 'dos@utdallas.edu',
    link: 'https://deanofstudents.utdallas.edu/',
  },
  {
    name: 'Development & Alumni Relations',
    phone: '972-883-2295',
    email: 'development@utdallas.edu',
    link: 'https://development.utdallas.edu/',
  },
  {
    name: 'Dining Services / Chartwells',
    phone: '972-883-7480',
    email: 'foodservice@utdallas.edu',
    link: 'https://services.utdallas.edu/dining/',
  },
  {
    name: 'Diversity & Community Engagement',
    phone: '972-883-6334',
    email: null,
    link: 'https://odei.utdallas.edu/',
  },
  {
    name: 'Economic, Political & Policy Sciences (EPPS)',
    phone: '972-883-2935',
    email: 'epps@utdallas.edu',
    link: 'https://epps.utdallas.edu/',
  },
  {
    name: 'Edith O\'Donnell Institute of Art History',
    phone: '972-883-2475',
    email: null,
    link: 'https://arthistory.utdallas.edu/',
  },
  {
    name: 'Educational Technology Services (ETS)',
    phone: '972-883-5918',
    email: 'eLearning@utdallas.edu',
    link: 'https://ets.utdallas.edu/',
  },
  {
    name: 'Einstein Bros Bagels',
    phone: '972-883-7470',
    email: null,
    link: 'https://locations.einsteinbros.com/us/tx/richardson/800-loop-road',
  },
  {
    name: 'eLearning Help Desk',
    phone: '866-588-3192',
    email: 'eLearning@utdallas.edu',
    link: 'https://ets.utdallas.edu/elearning/helpdesk',
  },
  {
    name: 'Emergency Management',
    phone: '972-883-7669',
    email: null,
    link: 'https://www.utdallas.edu/safety/',
  },
  {
    name: 'Engineering & Computer Science (ECS)',
    phone: '972-883-2974',
    email: 'engineering@utdallas.edu',
    link: 'https://engineering.utdallas.edu/',
  },
  {
    name: 'Facilities & Economic Development',
    phone: '972-883-2213',
    email: 'fed@utdallas.edu',
    link: 'https://fed.utdallas.edu/',
  },
  {
    name: 'Facilities Management',
    phone: '972-883-2141',
    email: 'ppworkrequest@utdallas.edu',
    link: 'https://facilities.utdallas.edu/',
  },
  {
    name: 'Financial Aid',
    phone: '972-883-2941',
    email: 'financial-aid@utdallas.edu',
    link: 'https://finaid.utdallas.edu/',
  },
  {
    name: 'Fraternity & Sorority Life',
    phone: '972-883-6523',
    email: 'fsl@utdallas.edu',
    link: 'https://gogreek.utdallas.edu/',
  },
  {
    name: 'Galerstein Gender Center',
    phone: '972-883-6555',
    email: 'GenderCenter@utdallas.edu',
    link: 'https://gendercenter.utdallas.edu/',
  },
  {
    name: 'Geosciences',
    phone: '972-883-2401',
    email: 'geosciences@utdallas.edu',
    link: 'https://geosciences.utdallas.edu/',
  },
  {
    name: 'Office of Graduate Education',
    phone: '972-883-2234',
    email: 'gradeducation@utdallas.edu',
    link: 'https://graduate.utdallas.edu/',
  },
  {
    name: 'Graduation Help Desk',
    phone: '972-883-3999',
    email: 'graduationhelpdesk@utdallas.edu',
    link: 'https://gradhelpdesk.utdallas.edu/',
  },
  {
    name: 'Health Professions Advising (HPAC)',
    phone: '972-883-6767',
    email: 'prehealth@utdallas.edu',
    link: 'https://oue.utdallas.edu/pre-health/',
  },
  {
    name: 'Help Desk & Computer Labs',
    phone: '972-883-2911',
    email: 'assist@utdallas.edu',
    link: 'https://oit.utdallas.edu/helpdesk/',
  },
];

const Contact = () => {
  const { scrollTo, highlight } = useLocalSearchParams();
  const scrollViewRef = useRef(null);
  const departmentRefs = useRef({});
  const highlightAnim = useRef(new Animated.Value(0)).current;

  // Sort departments once during render
  const sortedDepartments = React.useMemo(
    () => departments.sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  useEffect(() => {
    if (scrollTo) {
      // Wait for layout to complete
      setTimeout(() => {
        const targetRef = departmentRefs.current[scrollTo];
        if (targetRef && scrollViewRef.current) {
          targetRef.measure((x, y, width, height, pageX, pageY) => {
            scrollViewRef.current.scrollTo({
              y: pageY - 100, // Offset to account for header
              animated: true
            });

            if (highlight) {
              // Start highlight animation
              Animated.sequence([
                Animated.timing(highlightAnim, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: false,
                }),
                Animated.delay(1000),
                Animated.timing(highlightAnim, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: false,
                })
              ]).start();
            }
          });
        }
      }, 300);
    }
  }, [scrollTo, highlight]);

  const renderDepartment = (department, index) => {
    const isHighlighted = department.name === scrollTo;
    
    const backgroundColor = isHighlighted
      ? highlightAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['transparent', '#B1A18080']
        })
      : 'transparent';

    return (
      <React.Fragment key={department.name}>
        <Animated.View
          ref={ref => departmentRefs.current[department.name] = ref}
          style={[
            tw`rounded-lg`,
            { backgroundColor }
          ]}
        >
          <ContactComp
            name={department.name}
            phone={department.phone}
            email={department.email}
            link={department.link}
          />
        </Animated.View>
        {index < sortedDepartments.length - 1 && (
          <Divider style={tw`my-2`} />
        )}
      </React.Fragment>
    );
  };

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={tw`flex-1 bg-[#E4D3BA] p-5`}
    >
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
        {sortedDepartments.map((department, index) => 
          renderDepartment(department, index)
        )}
      </View>
    </ScrollView>
  );
};

export default Contact;