import { MissionariaritaPage } from './app.po';

describe('missionariarita App', () => {
  let page: MissionariaritaPage;

  beforeEach(() => {
    page = new MissionariaritaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
