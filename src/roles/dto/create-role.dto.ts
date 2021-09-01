import { FunctionalArea } from "src/global/app.enum";

export class CreateRoleDto {
    name: string;
    description: string;
    functionalArea: FunctionalArea;
}
