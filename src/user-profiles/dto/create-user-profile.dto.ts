import { ApiProperty } from "@nestjs/swagger";

export class CreateUserProfileDto {
    @ApiProperty()
    readonly photo: string; 
    readonly photoMimeType: string;
    readonly userId?: number;
}
