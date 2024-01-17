type Permission = {
    id: number;
    action: string;
    createdAt: string;
    updatedAt: string;
  };
  
  type CreateRoleParams = {
    typeRole: string;
    permissions: Permission[];
  };
  
  const defaultRoles = {
    technician: {
      name: 'Technician',
      type: 'technician',
      description: 'Default role given to admin user.'
    }
  };
  
  export const createRoles = async ({
    typeRole = 'technician',
    permissions
  }: CreateRoleParams) => {
    await strapi.query('plugin::users-permissions.role').create({
      data: {
        ...defaultRoles[typeRole],
        permissions
      }
    });
  };