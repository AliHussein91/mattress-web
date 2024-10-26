export class Country{
label: any;
    constructor(params: any){
        this.id = params.id || 0;
        this.name = ''
        this.flag = ''
        this.country_code = ''
        
    }
    id: number;
    name: string;
    flag: string;
    country_code: string;
}