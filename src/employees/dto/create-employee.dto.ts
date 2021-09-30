import { ApiProperty } from "@nestjs/swagger"

export class CreateEmployeeDto {
    @ApiProperty()
    readonly employeeNumber?: string
    readonly firstName: string
    readonly middleName?: string
    readonly lastName: string
    readonly jobPosition?: string
    readonly jobTitle?: string
    readonly photo?: string
}
