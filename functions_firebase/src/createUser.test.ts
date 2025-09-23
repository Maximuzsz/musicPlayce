import * as admin from "firebase-admin";
import { createUser } from "./createUser";
import * as httpMocks from "node-mocks-http";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

function getFirestoreMock(existing = false) {
  const firestore = () => ({
    collection: jest.fn().mockReturnValue({
      doc: jest.fn().mockReturnValue({
        get: jest.fn().mockResolvedValue({ exists: existing }),
        set: jest.fn().mockResolvedValue({}),
      }),
    }),
  });
  (firestore as any).FieldValue = {
    serverTimestamp: jest.fn(() => "MOCK_TIMESTAMP"),
  };
  return firestore as any;
}

describe("Cloud Function: createUser", () => {
  let firestoreSpy: jest.SpyInstance;

  beforeEach(() => {
    firestoreSpy = jest.spyOn(admin, "firestore").mockImplementation(getFirestoreMock());
    (admin.firestore as any).FieldValue = getFirestoreMock().FieldValue;
  });

  afterEach(() => {
    firestoreSpy.mockRestore();
  });

  it("deve criar um novo usuário e retornar status 201", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: { email: "user@email.com", name: "Fulano" },
    });
    const res = httpMocks.createResponse();

    await createUser(req as any, res as any);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData().message).toBe("Usuário criado com sucesso");
  });

  it("deve retornar 400 se o email for inválido", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: { email: "email-invalido", name: "Fulano" },
    });
    const res = httpMocks.createResponse();

    await createUser(req as any, res as any);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toBe("Email inválido");
  });

  it("deve retornar 409 se o email já existir", async () => {
    firestoreSpy.mockImplementation(getFirestoreMock(true));
    (admin.firestore as any).FieldValue = getFirestoreMock(true).FieldValue;

    const req = httpMocks.createRequest({
      method: "POST",
      body: { email: "duplicado@email.com", name: "Fulano" },
    });
    const res = httpMocks.createResponse();

    await createUser(req as any, res as any);

    expect(res.statusCode).toBe(409);
    expect(res._getJSONData().error).toBe("Usuário já existe");
  });

  it("deve retornar 405 se o método não for POST", async () => {
    const req = httpMocks.createRequest({ method: "GET", body: {} });
    const res = httpMocks.createResponse();

    await createUser(req as any, res as any);

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData().error).toBe("Método não permitido");
  });

  it("deve retornar 400 se o nome não for fornecido", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: { email: "user@email.com", name: "" },
    });
    const res = httpMocks.createResponse();

    await createUser(req as any, res as any);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toBe("Nome é obrigatório");
  });
});
