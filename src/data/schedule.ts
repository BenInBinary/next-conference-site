export interface Speaker {
    id: string;
    firstName: string;
    lastName: string;
    linkedIn: string;
}

export interface Talk {
    id: string;
    time: string;
    title: string;
    category: string;
    description: string;
    speakers: Speaker[];
}

// Dummy data for speakers
export const speakers: Record<string, Speaker> = {
    s1: { id: 's1', firstName: 'Jane', lastName: 'Doe', linkedIn: 'https://linkedin.com/in/janedoe' },
    s2: { id: 's2', firstName: 'John', lastName: 'Smith', linkedIn: 'https://linkedin.com/in/johnsmith' },
    s3: { id: 's3', firstName: 'Alice', lastName: 'Johnson', linkedIn: 'https://linkedin.com/in/alicejohnson' },
    s4: { id: 's4', firstName: 'Bob', lastName: 'Brown', linkedIn: 'https://linkedin.com/in/bobbrown' },
    s5: { id: 's5', firstName: 'Charlie', lastName: 'Davis', linkedIn: 'https://linkedin.com/in/charliedavis' },
    s6: { id: 's6', firstName: 'Diana', lastName: 'Miller', linkedIn: 'https://linkedin.com/in/dianamiller' },
    s7: { id: 's7', firstName: 'Evan', lastName: 'Wilson', linkedIn: 'https://linkedin.com/in/evanwilson' },
    s8: { id: 's8', firstName: 'Fiona', lastName: 'Moore', linkedIn: 'https://linkedin.com/in/fionamoore' }
};

// Dummy data for schedule talks
export const scheduleData: Talk[] = [
    {
        id: 't1',
        time: '09:00 AM - 10:00 AM',
        title: 'Keynote: The Future of Google Cloud',
        category: 'Architecture',
        description: 'Join us as we explore the vision and upcoming features across the Google Cloud ecosystem.',
        speakers: [speakers.s1]
    },
    {
        id: 't2',
        time: '10:00 AM - 11:00 AM',
        title: 'Serverless at Scale with Cloud Run',
        category: 'Serverless',
        description: 'Learn how to build, deploy, and scale containerized applications on a fully managed serverless platform.',
        speakers: [speakers.s2, speakers.s3]
    },
    {
        id: 't3',
        time: '11:00 AM - 12:00 PM',
        title: 'Mastering Kubernetes on GKE',
        category: 'Architecture',
        description: 'Deep dive into best practices for running and maintaining enterprise grade clusters using Google Kubernetes Engine.',
        speakers: [speakers.s4]
    },
    {
        id: 'break',
        time: '12:00 PM - 01:00 PM',
        title: 'Lunch Break (60 mins)',
        category: 'Break',
        description: 'Enjoy a provided lunch and network with other attendees.',
        speakers: []
    },
    {
        id: 't4',
        time: '01:00 PM - 02:00 PM',
        title: 'Data warehouse modernization with BigQuery',
        category: 'Data & Analytics',
        description: 'Strategies for migrating to BigQuery and unlocking insights through machine learning and advanced analytics.',
        speakers: [speakers.s5]
    },
    {
        id: 't5',
        time: '02:00 PM - 03:00 PM',
        title: 'Building AI Applications with Vertex AI',
        category: 'AI / ML',
        description: 'Discover how to build and deploy custom ML models and leverage generative AI tools on Vertex AI.',
        speakers: [speakers.s6, speakers.s1]
    },
    {
        id: 't6',
        time: '03:00 PM - 04:00 PM',
        title: 'Securing Your Cloud Infrastructure',
        category: 'Security',
        description: 'A comprehensive guide to identifying vulnerabilities and implementing robust security postures on GCP.',
        speakers: [speakers.s7]
    },
    {
        id: 't7',
        time: '04:00 PM - 05:00 PM',
        title: 'Optimizing Cloud Costs',
        category: 'FinOps',
        description: 'Effective FinOps strategies to monitor, control, and reduce your Google Cloud spend without sacrificing performance.',
        speakers: [speakers.s8]
    },
    {
        id: 't8',
        time: '05:00 PM - 06:00 PM',
        title: 'Closing Thoughts and Ask Me Anything',
        category: 'General',
        description: 'An open Q&A session covering all things Google Cloud and closing remarks for the conference.',
        speakers: [speakers.s1, speakers.s4]
    }
];
