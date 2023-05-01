import { Locator, Page, expect } from '@playwright/test';
import { BasePage, ScenarioPage, CoursePage } from '.'; //For ScenarioPage and CoursePage

export class ContentManagementPage extends BasePage {
  private uniqueString: string = 'e2e-testing' + Math.random();
  private newUniqueString = 'e2e-testingNew' + Math.random();
  private oldDuration = '1';
  private newDuration = '2';
  private scenarioRegex = new RegExp(`Select.*${this.uniqueString}`);

  readonly page: Page;
  readonly buttonDelete: Locator;
  readonly buttonDeleteTrue: Locator;
  readonly buttonSave: Locator;
  readonly buttonAddTrue: Locator;
  readonly buttonAddCategory: Locator;
  readonly buttonSelectAvailableActions: Locator;
  readonly buttonNewStep: Locator;
  readonly buttonMoveDown: Locator;
  readonly buttonEdit: Locator;
  readonly buttonNext: Locator;
  readonly buttonStepEditor: Locator;
  readonly buttonAddTag: Locator;
  readonly textboxCategory: Locator;
  readonly tabCategory: Locator;
  readonly tabSteps: Locator;
  readonly tabTags: Locator;
  readonly labelTagTrue: Locator;
  readonly contentManagement: Locator;
  readonly scenarios: Locator;
  readonly newScenario: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly keepaliveDuration: Locator;
  readonly selectScenario: Locator;
  readonly selectStepA: Locator;
  readonly selectStepB: Locator;
  readonly selectStepC: Locator;
  readonly durationInHours: Locator;
  readonly addVMSet: Locator;
  readonly scenarioModified: Locator;
  readonly deleteVM: Locator;
  readonly deleteVMSet: Locator;
  readonly saveStep: Locator;
  readonly createNewStep: Locator;

  constructor(page: Page, username: string) {
    super(page, username);
    this.page = page;
    this.buttonDelete = page.getByRole('button', { name: 'Delete' });
    this.buttonDeleteTrue = page.getByRole('button', { name: 'Delete', exact: true });
    this.buttonSave = page.getByRole('button', { name: 'Save' });
    this.buttonAddTrue = page.getByRole('button', { name: 'Add', exact: true });
    this.buttonAddCategory = page.getByRole('button', { name: 'Add Category' });
    this.buttonSelectAvailableActions = page.getByRole('button', { name: 'Available actions' }).locator('svg');
    this.buttonNewStep = page.getByRole('button', { name: 'New Step' });
    this.buttonMoveDown = page.getByRole('button', { name: 'Move Down' });
    this.buttonEdit = page.getByRole('button', { name: 'Edit', exact: true });
    this.buttonNext = page.getByRole('button', { name: 'Next' });
    this.buttonStepEditor = page.getByRole('button', { name: 'Open Step Editor' });
    this.buttonAddTag = page.getByRole('button', { name: 'Add Tag' });
    this.textboxCategory = page.getByRole('textbox', { name: 'Category' });
    this.tabCategory = page.getByRole('tab', { name: 'Categories' });
    this.tabSteps = page.getByRole('tab', { name: 'Steps' });
    this.tabTags = page.getByRole('tab', { name: 'Tags' });
    this.labelTagTrue = page.getByLabel('Tag', { exact: true });
    this.contentManagement = page.getByRole('link', { name: 'Content Management' });
    this.scenarios = page.getByRole('link', { name: 'Scenarios' });
    this.newScenario = page.getByRole('button', { name: 'New Scenario' });
    this.name = page.getByLabel('Name');
    this.description = page.getByLabel('Description');
    this.keepaliveDuration = page.getByLabel('Keepalive Duration');
    this.selectScenario = page.getByRole('row', { name: this.scenarioRegex }).locator('label');
    this.selectStepA = page.getByRole('row', { name: 'Available actions 1 Step 1' }).locator('circle').nth(2);
    this.selectStepB = page.getByRole('row', { name: 'Available actions 1 Step 2' }).locator('svg');
    this.selectStepC = page.getByRole('row', { name: 'Available actions 2 Step 1' }).locator('svg');
    this.durationInHours = page.getByPlaceholder('Duration in hours');
    this.addVMSet = page.getByRole('button', { name: 'Add VM Set' });
    this.scenarioModified = page.getByText('Scenario has been modified. Save your changes.');
    this.deleteVM = page.getByRole('button', { name: 'Delete VM Set', exact: true });
    this.deleteVMSet = page.getByRole('dialog', { name: 'Delete VM Set' }).getByRole('button', { name: 'Delete' });
    this.saveStep = page.getByRole('dialog', { name: 'Edit Step 2 of 2' }).getByRole('button', { name: 'Save' });
    this.createNewStep = page.getByTitle('Create new step at the end');
  }

  async openNewCourseModalAndSave(courseName: string, description: string, keepaliveDuration: string, pauseDuration: string): Promise<ContentManagementPage> { //For CoursePage
    const coursePage = new CoursePage(this.page);
    await coursePage.openNewCourseForm();
    await coursePage.fillNewCourseForm(courseName, description, keepaliveDuration, pauseDuration);
    await coursePage.saveNewCourseForm();
    return new ContentManagementPage(this.page, this.username);
  }

  async openNewScenarioModalAndSave(scenarioName: string, description: string, keepaliveDuration: string, pauseDuration: string): Promise<ContentManagementPage> { //For ScenarioPage
    const scenarioPage = new ScenarioPage(this.page);
    await scenarioPage.openNewScenarioForm();
    await scenarioPage.fillNewScenarioForm(scenarioName, description, keepaliveDuration, pauseDuration);
    await scenarioPage.saveNewScenarioForm();
    return new ContentManagementPage(this.page, this.username);
  }

  async openContentManagementScenarios() {
    await this.contentManagement.click();
    await this.scenarios.click();
  }

  async openContentManagementNewScenario() {
    await this.newScenario.click();
    await this.name.click();
    await this.name.fill(this.uniqueString);
    await this.description.click();
    await this.description.fill(this.uniqueString);
    await this.keepaliveDuration.click();
    await this.keepaliveDuration.fill(this.oldDuration);
    await this.buttonSave.click();
    await this.page.reload();
    return this.uniqueString;
  }

  //async openContentManagemetDeleteScenario() {
  //Not possible yet
  //}

  async openContentManagementChangeDetails() {
    await this.selectScenario.click();
    await this.name.click();
    await this.name.fill(this.newUniqueString);
    await this.description.click();
    await this.description.fill(this.newUniqueString);
    await this.keepaliveDuration.click();
    await this.keepaliveDuration.fill(this.newDuration);
    await this.durationInHours.click();
    await this.durationInHours.fill(this.newDuration);
    await this.addVMSet.click();
    await expect(this.scenarioModified).toBeVisible();
    await this.buttonSave.click();
    await this.page.reload();
    await this.selectScenario.click();
    await expect(this.name).toHaveValue(this.newUniqueString);
    await expect(this.description).toHaveValue(this.newUniqueString);
    await expect(this.keepaliveDuration).toHaveValue(this.newDuration);
    await expect(this.durationInHours).toHaveValue(this.newDuration);
    await this.name.click();
    await this.name.fill(this.uniqueString);
    await this.deleteVM.click();
    await this.deleteVMSet.click();
    await expect(this.scenarioModified).toBeVisible();
    await this.buttonSave.click();
    await this.page.reload();
    await this.selectScenario.click();
  }

  async openContentManagementScenarioSteps() {
    await this.selectScenario.click();
    await this.tabSteps.click();
    await this.buttonNewStep.click();
    await this.buttonSave.click();
    await this.buttonStepEditor.click();
    await this.page.getByTitle('Create new step at the end').click();
    await expect(this.buttonSave).toBeVisible();
    await this.buttonSave.click();
    await this.selectStepA.click();
    await this.buttonMoveDown.click();
    await this.selectStepB.click();
    await this.buttonEdit.click();
    await this.buttonNext.click();
    await expect(this.page.getByRole('heading', { name: 'Edit Step 2 of 2' })).toBeVisible();
    await expect(this.page.locator('textarea')).toBeVisible();
    await this.saveStep.click();
    await this.tabSteps.click();
    await this.selectStepC.waitFor();
    await this.selectStepC.click();
    await this.buttonDelete.click();
    await this.buttonDelete.click();
    await expect(this.page.getByRole('gridcell', { name: 'Step 2' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Available actions' }).locator('svg').click();
    await this.buttonDelete.click();
    await this.buttonDelete.click();
  }

  async openContentManagementAddCategory() {
    await this.selectScenario.click();
    await this.tabCategory.click();
    await this.buttonAddCategory.click();
    await this.textboxCategory.click();
    await this.textboxCategory.fill('e2eTest');
    await this.buttonAddTrue.click();
    await this.buttonSave.click();
    await this.page.reload();
  }

  async openContentManagementSearchCategory() {
    await this.page.getByRole('button', { name: 'Show options' }).locator('svg').click();
    await this.page.getByRole('option', { name: 'test' }).click();
    await this.page.getByRole('heading', { name: 'Scenarios' }).click();
  }

  async openContentManagementDeleteCategory() {
    await this.selectScenario.click();
    await this.tabCategory.click();
    expect(this.buttonSelectAvailableActions).toBeVisible();
    await this.buttonSelectAvailableActions.click();
    await this.buttonDeleteTrue.click(); //buttonDeleteTrue in combination with openContentManagementSearchCategory, otherwise buttonDelete
    await this.buttonSave.click();
    await expect(this.buttonSelectAvailableActions).toBeHidden();
  }

  async openContentManagemetTags() {
    await this.selectScenario.click();
    await this.tabTags.click();
    await this.buttonAddTag.click();
    await this.labelTagTrue.click();
    await this.labelTagTrue.fill('e2eTest');
    await this.buttonAddTrue.click();
    await this.buttonSave.click();
    await this.page.reload();
    await this.selectScenario.click();
    await this.tabTags.click();
    await this.buttonSelectAvailableActions.click();
    await this.buttonDelete.click();
    await this.buttonSave.click();
    expect(this.page.getByRole('gridcell', { name: 'e2eTest', exact: true })).toBeHidden();
  }

  async contentManagementScenarioDetails(): Promise<ContentManagementPage> {
    await this.openContentManagementScenarios();
    await this.openContentManagementNewScenario();
    await this.openContentManagementChangeDetails();
    //await this.openContentManagemetDeleteScenario();
    return new ContentManagementPage(this.page, this.username);
  }

  async contentManagementScenarioSteps(): Promise<ContentManagementPage> {
    await this.openContentManagementScenarios();
    await this.openContentManagementNewScenario();
    await this.openContentManagementScenarioSteps();
    //await this.openContentManagemetDeleteScenario();
    return new ContentManagementPage(this.page, this.username);
  }

  async contentManagementScenarioCategories(): Promise<ContentManagementPage> {
    await this.openContentManagementScenarios();
    await this.openContentManagementNewScenario();
    await this.openContentManagementAddCategory();
    await this.openContentManagementSearchCategory();
    await this.openContentManagementDeleteCategory();
    //await this.openContentManagemetDeleteScenario();
    return new ContentManagementPage(this.page, this.username);
  }

  async contentManagementScenarioTags(): Promise<ContentManagementPage> {
    await this.openContentManagementScenarios();
    await this.openContentManagementNewScenario();
    await this.openContentManagemetTags();
    //await this.openContentManagemetDeleteScenario();
    return new ContentManagementPage(this.page, this.username);
  }
}
