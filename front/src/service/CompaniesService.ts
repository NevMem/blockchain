import { Company } from "../data/Company";

class CompaniesService {
    private companiesImpl = [
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

    companies(): Promise<Company[]> {
        return new Promise((res, rej) => {
            setTimeout(
                () => {
                    // rej(Error("kek"))
                    res(this.companiesImpl);
                },
                1500
            );
        });
        // return this.companiesImpl;
    }

    company(id: string): Promise<Company> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(this.companiesImpl.find(elem => elem.id === id)!)
            }, 1500)
        });
    }
};

const companiesService = new CompaniesService();

export default companiesService;
