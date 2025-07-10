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

    constructor(id: ObjectId, name: string, email: string, linkedin: string, jobExperience: string, volunteerMotivation: string, area: string, subarea: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.linkedin = linkedin;
        this.area = area;
        this.subarea = subarea;
        this.jobExperience = jobExperience;
        this.volunteerMotivation = volunteerMotivation;
    }

}