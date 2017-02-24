import { NuevosVientosWebPage } from './app.po';

describe('nuevos-vientos-web App', function() {
  let page: NuevosVientosWebPage;

  beforeEach(() => {
    page = new NuevosVientosWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
