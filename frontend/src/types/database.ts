export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          admin_id: string;
          description: string | null;
          id: string;
          is_inbox: boolean;
          name: string;
        };
        Insert: {
          admin_id: string;
          description?: string | null;
          id?: string;
          is_inbox?: boolean;
          name: string;
        };
        Update: {
          admin_id?: string;
          description?: string | null;
          id?: string;
          is_inbox?: boolean;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_admin_id_fkey";
            columns: ["admin_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      sections: {
        Row: {
          id: string;
          name: string;
          position: number;
          project_id: string;
        };
        Insert: {
          id?: string;
          name: string;
          position: number;
          project_id: string;
        };
        Update: {
          id?: string;
          name?: string;
          position?: number;
          project_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sections_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      tasks: {
        Row: {
          created_at: string;
          date: string | null;
          description: string | null;
          id: string;
          is_done: boolean;
          project_id: string;
          section_id: string | null;
          title: string;
        };
        Insert: {
          created_at?: string;
          date?: string | null;
          description?: string | null;
          id?: string;
          is_done?: boolean;
          project_id?: string;
          section_id?: string | null;
          title: string;
        };
        Update: {
          created_at?: string;
          date?: string | null;
          description?: string | null;
          id?: string;
          is_done?: boolean;
          project_id?: string;
          section_id?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_section_id_fkey";
            columns: ["section_id"];
            isOneToOne: false;
            referencedRelation: "sections";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          email: string;
          id: string;
          name: string;
        };
        Insert: {
          email: string;
          id?: string;
          name?: string;
        };
        Update: {
          email?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      users_projects: {
        Row: {
          project_id: string;
          user_id: string;
        };
        Insert: {
          project_id?: string;
          user_id?: string;
        };
        Update: {
          project_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_projects_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type UserRow = Database["public"]["Tables"]["users"]["Row"];
