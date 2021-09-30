import { ApiProperty } from "@nestjs/swagger";
import { FunctionalArea } from "src/global/app.enum";

export class CreateRoleDto {
    @ApiProperty()
    readonly name: string;
    readonly description?: string;
    readonly functionalArea?: FunctionalArea;
}
