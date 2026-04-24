import { getTemplateRepository } from "../repositories/template_repository";


 export async  function getTemplateIdService(templateId:string){
        return getTemplateRepository(templateId)
    }
