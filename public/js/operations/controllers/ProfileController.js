import { profileService } from '../services/ProfileService.js'

class ProfileController {

    fetchProfiles() {
        return profileService.fetchProfiles()
    }

    addProfile(body) {
        return profileService.addProfile(body)
    }

    getProfile(uuid) {
        return profileService.getProfile(uuid)
    }

    updateProfile(body) {
        return profileService.updateProfile(body)
    }

    deleteProfile(uuid) {
        return profileService.deleteProfile(uuid)
    }

    addCard(uuid, body) {
        return profileService.addCard(uuid, body)
    }
}

export const profileController = new ProfileController()