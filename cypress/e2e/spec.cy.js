let username = "tomsmith";
let password = "SuperSecretPassword!";

describe('login', () => {
  beforeEach('Open page', function () {
    cy.visit('https://the-internet.herokuapp.com')
    cy.contains('Form Authentication').click()
  })

  it('Checks Login Page', function () {
    cy.url().should('include', '/login')
    cy.get('#content > div > h2').should('have.text', 'Login Page')
    cy.get('#content > div > h4').should('have.text', 'This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.')
    cy.get('#login > div:nth-child(1) > div > label').should('have.text', 'Username')
    cy.get('#login > div:nth-child(2) > div > label').should('have.text', 'Password')
    cy.get('#login > button > i').should('have.text', ' Login')
    cy.get('#page-footer > div > div').should('have.text', 'Powered by Elemental Selenium')
  })
  it('Logins', function () {
    cy.get('#username').type(username).should('have.value', username)
    cy.get('#password').type(password).should('have.value', password)
    cy.get('#login > button').click()
  })
  /*
  it('Radimo screenshot', () => {
    cy.visit('https://the-internet.herokuapp.com');
    cy.screenshot("homepage");
    cy.wait(5000);
    cy.get('img').screenshot('fork me on GitHub');

  })*/
  it('Test add -remove elements', function () {
    cy.visit("https://the-internet.herokuapp.com/add_remove_elements/");
    cy.get('[onclick="addElement()"]').click();
    cy.get('.added-manually').click();
    cy.get('.added-manually [onclick="deleteElement()"]').should('not.exist');
  })
  it('A/B test verzija stranica ', function () {
    cy.visit('https://the-internet.herokuapp.com/abtest');

    // Da li je to dobra stranica
    cy.title().should('eq', 'The Internet');

    // Provera  natpisa u hederu
    cy.get('h3').should('exist');

    // Kojqa je varjanta ispisana  ( A/B Test Control ili  A/B Test Variation 1)
    cy.get('h3').invoke('text').then(text => {
      if (text === 'A/B Test Control') {
        // Control varjanta ima neki <p> sa nekim bla bla tekstom
        cy.get('p').should('contain', 'Also known as split testing');
        //Variation1 ima  neki drugi text razlicito od Control
      } else if (text === 'A/B Test Variation 1') {
        // i Varijanta 1 mora da ima text varjante 1 ---Kada Testiras WP!!!!!!!
        cy.get('p').should('contain', 'testing');// Assert je stavljena univerzalna rec da bi test prosao  dalje !!!!!
      }

    });

  

  
  });
  // Click for JS Alert 
  it("Verifiy JS Alert  ", function(){

    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
    expect(cy.contains('JavaScript Alerts')).to.exist; 
   cy.get(':nth-child(1) > button').contains('Click for JS Alert').click();

   cy.on('window:alert', (text) => {
      expect(text).to.contains('I am a JS Alert');

    });
    cy.get('#result').should('have.text','You successfully clicked an alert')

  })
  it('Test Verify JS confirm',function(){
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
    expect(cy.contains('JavaScript Alerts')).to.exist; 
    cy.get(':nth-child(2) > button').contains('Click for JS Confirm').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('I am a JS Confirm');

    
    cy.get('#result').should('have.text', 'You clicked: Cancel')
  });
})
it('Test Verify JS prompt', function(){
  cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
  
  expect(cy.contains('JavaScript Alerts')).to.exist;
  
  cy.get(':nth-child(3)> button').contains('Click for JS Prompt').click();
  
  expect(cy.contains('JavaScript Alerts')).to.exist; 
  cy.get(':nth-child(3) > button').contains('Click for JS Prompt').click();

  cy.on('window:alert', (text) => {
     expect(text).to.contains('I am a JS prompt');
    });
  });
});

