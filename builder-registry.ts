"use client";
import News from "@/components/News";
import Accordioon from "@/components/shared/Accordioon";
import { type RegisteredComponent } from "@builder.io/sdk-react";

export const customComponents: RegisteredComponent[] = [
  {
    component: Accordioon,
    name: 'Accordioon',
    inputs: [
      {
        name: 'data',
        type: 'list',
        subFields: [
          { name: 'title', type: 'text' },
          { name: 'text', type: 'richText' }
        ],
        defaultValue: [
          {
            title: 'Заголовок',
            text: '<p>Текст или описание</p>'
          }
        ]
      }
    ],
    image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F6bef27ee40d24f3b88239fd7e616f82a'
  },
  {
    component: News,
    name: 'News',
    image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F6bef27ee40d24f3b88239fd7e616f82a'
  }
]