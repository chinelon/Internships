import {Gender} from "src/global/app.enum"
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    
    @ApiProperty()
    readonly firstName: string;
    readonly middleName?: string;
    readonly lastName: string;
    readonly commonName?: string;
    readonly homeAddress: string;
    readonly gender: Gender;
    readonly dateOfBirth: Date;
    readonly nationality?: string;
    readonly state?: string;
    readonly city?: string
    readonly county?: string
    readonly zip?: string;
    readonly isActive?: boolean;
    readonly isSoftDeleted?: boolean;
    readonly primaryEmailAddress: string;
    readonly backupEmailAddress?: string;
    readonly phone?: { mobile: string[], office: string[], home: string[] }
    readonly isPrimaryEmailAddressVerified?: boolean;
    readonly isBackupEmailAddressVerified?: boolean;
    passwordHash: string;
    readonly isPasswordChangeRequired?: boolean;
    readonly resetPasswordToken?: string;
    readonly resetPasswordExpiration?: Date;
    readonly primaryEmailVerificationToken?: string;
    readonly backupEmailVerificationToken?: string;
    readonly emailVerificationTokenExpiration?: Date;
    readonly otpEnabled?: boolean;
    readonly otpSecret?: string;
    readonly refreshTokenHash?: string;
    readonly userProfile?: CreateUserDto;
    readonly departmentId?: number
}

