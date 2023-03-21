// import { expect } from '@playwright/test';
import { binding, given, then, when} from 'cucumber-tsflow';

@binding()
export class LoginSteps {
  @given(/I am on the HobbyFarm Admin UI login page/)
  public givenLoginPageIsOpened() {
    // TODO
  }

  @when(/I enter my valid username and password/)
  public whenValidUserNameAndPasswordAreEntered() {
    // TODO
  }

  @when(/click the login button/)
  public whenLoginButtonIsClicked() {
    // TODO
  }

  @then(/I should be redirected to HobbyFarm Admin UI home page/)
  public thenHomePageIsDisplayed() {
    // TODO
  }
}
