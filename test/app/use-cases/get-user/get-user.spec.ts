import { UserMother } from "test/mothers/user";
import { GetUserUseCaseInputMother } from "./get-user-input-mother";
import { GetUserUseCase } from "#app/use-cases/get-user/get-user";
import { UserNotFound } from "#app/exceptions/user-not-found";
import { k8s1Mock } from "test/test-doubles/k8s-1.mock";
import { K8SGetUserNotFound, K8SGetUserResultOk } from "#app/ports/k8s-1/get-user/k8s-1-get-user.result";

describe("Use Case - Get User", () => {
  const k8s1Service = k8s1Mock();
  const getUserUseCase = new GetUserUseCase(k8s1Service);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should get a correct user", async () => {
    const expectedUser = UserMother.any();
    k8s1Service.getUser.mockReturnValue(
      new K8SGetUserResultOk(expectedUser.username, expectedUser.password, expectedUser.id)
    );
    const input = GetUserUseCaseInputMother.any();
    const user = await getUserUseCase.execute(input);
    expect(user).toEqual(expectedUser);
  });

  test("shouldn't get a correct user", async () => {
    k8s1Service.getUser.mockReturnValue(new K8SGetUserNotFound());
    const newId = "1";
    const input = GetUserUseCaseInputMother.any({ id: newId });
    const user = await getUserUseCase.execute(input);
    expect(user).toEqual(new UserNotFound(newId));
  });
});
