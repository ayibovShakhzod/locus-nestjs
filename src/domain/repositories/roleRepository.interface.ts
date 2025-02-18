export interface RoleRepository {
  getRoleByName(name: string): Promise<string | null>;
}
