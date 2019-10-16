describe("Django REST framework / React quickstart app", () => {
  const lead = {
    name: "Armin",
    email: "some-email@gmail.com",
    message: "I am looking for a React tutor"
  };
    // eslint-disable-next-line no-undef
  before(() => {
      // eslint-disable-next-line no-undef
    cy.exec("npm run dev");
      // eslint-disable-next-line no-undef
    cy.exec("npm run flush");
  });
  it("should be able to fill a web form", () => {
      // eslint-disable-next-line no-undef
    cy.visit("/");
      // eslint-disable-next-line no-undef
    cy
      .get('input[name="name"]')
      .type(lead.name)
      .should("have.value", lead.name);
      // eslint-disable-next-line no-undef
    cy
      .get('input[name="email"]')
      .type(lead.email)
      .should("have.value", lead.email);
      // eslint-disable-next-line no-undef
    cy
      .get('textarea[name="message"]')
      .type(lead.message)
      .should("have.value", lead.message);
      // eslint-disable-next-line no-undef
    cy.get("form").submit();
  });
  // more tests here
});