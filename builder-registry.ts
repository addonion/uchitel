"use client";
import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(
  dynamic(() => import('@/components/shared/Accordioon')),
  {
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
  }
);

Builder.registerComponent(
  dynamic(() => import('@/components/News')),
  {
    name: 'News',
    image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F6bef27ee40d24f3b88239fd7e616f82a'
  }
);