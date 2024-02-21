import { profileService } from '../services/ProfileService.js'

class ProfileController {

    fetchProfiles() {
        return profileService.fetchProfiles()
    }

    updateProfiles(body) {
        return profileService.updateProfiles(body)
    }
}

export const profileController = new ProfileController()