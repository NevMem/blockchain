import { Company } from "../data/Company";

class CompaniesService {
    private companiesImpl = [
        {
            id: 'google',
            name: 'Google',
            imageUrl: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png',
            rate: 0.002,
        },
        {
            id: 'twitter',
            name: 'Twitter',
            imageUrl: 'https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png',
            rate: 0.003,
        },
        {
            id: 'space-x',
            name: 'SpaceX',
            imageUrl: 'https://www.freepnglogos.com/uploads/astronaut-png/astronaut-space-clip-art-5.png',
            rate: 1.2,
        },
    ];

    companies(): Promise<Company[]> {
        return new Promise((res, rej) => {
            setTimeout(
                () => {
                    res(this.companiesImpl);
                },
                200
            );
        });
    }

    company(id: string): Promise<Company> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                const company = this.companiesImpl.find(elem => elem.id === id);
                if (company !== undefined) {
                    res(company!);
                } else {
                    rej(Error("Компания не найдена"));
                }
            }, 200)
        });
    }

    buyTokens(): Promise<string> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res("");
            }, 200);
        });
    }
};

const companiesService = new CompaniesService();

export default companiesService;
