import { ObjectId } from "typeorm";

export class JuniorDataCsvDto{
      id: ObjectId;
    
      name: string;
    
      email: string;
    
      linkedin: string;
    
      area: string;
    
      subarea ?: string;


      constructor(id:ObjectId, name: string, email: string, linkedin: string, area: string, subarea: string){
            this.id = id;
            this.name = name;
            this.email = email;
            this.linkedin = linkedin;
            this.area = area;
            this.subarea = subarea;
      }
}