import { ApiProperty } from "@nestjs/swagger";
import { CountryList } from "src/global/app.enum";

export class CreateDepartmentDto {
    @ApiProperty()

    readonly name: string;
    readonly description?: string;
    readonly location: CountryList;
}
