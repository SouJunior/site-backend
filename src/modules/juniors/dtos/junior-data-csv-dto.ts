import { Column, ObjectId, ObjectIdColumn } from "typeorm";

export class JuniorDataCsvDto{
      @ObjectIdColumn()
      id: ObjectId;
    
      @Column()
      name: string;
    
      @Column()
      email: string;
    
      @Column()
      linkedin: string;
    
      @Column()
      area: string;
    
      @Column()
      subarea ?: string;


      constructor(id:ObjectId, name: string, email: string, linkendin: string, area: string, subarea: string){
            this.id = id;
            this.name = name;
            this.email = email;
            this.linkedin = linkendin;
            this.area = area;
            this.subarea = subarea;
      }
}