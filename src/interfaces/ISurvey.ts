import {ISurveyResponse} from "@/interfaces/ISurveyResponse";
export interface ISurvey {
  id: string;
  username: string;
  responses: ISurveyResponse[];
}
