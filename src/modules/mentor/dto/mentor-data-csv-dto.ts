import { ObjectId } from "typeorm";

export class MentorDataCsvDto {
    id: ObjectId;

    name: string;

    email: string;

    linkedin: string;

    area: string;

    subarea: string;

    jobExperience: string;

    volunteerMotivation: string;

    startDate: Date;

    createdAt: Date;


    constructor(id: ObjectId, name: string, email: string, linkedin: string, jobExperience: string, volunteerMotivation: string, area: string, subarea: string, startDate: Date, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.linkedin = linkedin;
        this.area = area;
        this.subarea = subarea;
        this.jobExperience = jobExperience;
        this.volunteerMotivation = volunteerMotivation;
        this.startDate = startDate;
        this.createdAt = createdAt;
    }

}