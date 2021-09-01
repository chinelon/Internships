import {Gender} from "src/global/app.enum"
export class CreateUserDto {
    firstName: string;
    middleName: string;

    
    lastName: string;
    commonName: string;
    homeAddress: string;
    gender: Gender;
    dateOfBirth: Date;
    nationality: string;
    state: string;
    city: string
    county: string
    zip: string;
    isActive: boolean;
    isSoftDeleted: boolean;
    primaryEmailAddress: string;
    backupEmailAddress: string;
    phone: { mobile: string[], office: string[], home: string[] }
    isPrimaryEmailAddressVerified: boolean;
    isBackupEmailAddressVerified: boolean;
    passwordHash: string;
    isPasswordChangeRequired: boolean;
    resetPasswordToken: string;
    resetPasswordExpiration: Date;
    primaryEmailVerificationToken: string;
    backupEmailVerificationToken: string;
    emailVerificationTokenExpiration: Date;
    otpEnabled: boolean;
    otpSecret: string;
    public refreshTokenHash: string;
}
