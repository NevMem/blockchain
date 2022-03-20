import { Company } from "../data/Company";

class CompaniesService {
    companies(): Company[] {
        return [
            {
                id: 'google',
                name: 'Google',
                imageUrl: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png',
            },
            {
                id: 'twitter',
                name: 'Twitter',
                imageUrl: 'https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png',
            },
            {
                id: 'space-x',
                name: 'SpaceX',
                imageUrl: 'https://www.freepnglogos.com/uploads/astronaut-png/astronaut-space-clip-art-5.png',
            },
        ];
    }
};

const companiesService = new CompaniesService();

export default companiesService;
