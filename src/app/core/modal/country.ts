export class Country{
    constructor(params: any){
        this.id = params.id || 0;
        this.name = ''
        
    }
    id: number;
    name: string;
}