'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Locale } from '@/i18n-config';
import { useSearchParams } from 'next/navigation';
import { tagDictionary, TagIds } from '@/lib/tags';
import Link from 'next/link';

const subCategories = [
  { name: 'CDBD', href: '#' },
  { name: 'Topical', href: '#' },
  { name: 'RE@Home', href: '#' },
  { name: 'Doctrinal', href: '#' },
  { name: 'Miscellaneous', href: '#' },
];
const filters = [
  {
    id: 'color',
    name: 'Themes',
    options: [
      { value: 'white', label: 'Joy', checked: false },
      { value: 'beige', label: 'Suffering', checked: false },
      { value: 'blue', label: 'Love', checked: false },
      { value: 'brown', label: 'Service', checked: false },
      { value: 'green', label: 'Praise', checked: false },
      { value: 'purple', label: 'Thanksgiving', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Doctrine',
    options: [
      { value: 'new-arrivals', label: 'Jesus Christ', checked: false },
      { value: 'sale', label: 'Holy Bible', checked: false },
      { value: 'travel', label: 'One True Church', checked: false },
      { value: 'organization', label: 'Water Baptism', checked: false },
      { value: 'accessories', label: 'Footwashing', checked: false },
      { value: 'new-arrivals', label: 'Holy Spirit', checked: false },
      { value: 'sale', label: 'Holy Communion', checked: false },
      { value: 'travel', label: 'Sabbath Day', checked: false },
      { value: 'organization', label: 'Salvation', checked: false },
      { value: 'accessories', label: 'Second Coming', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Book',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: false },
    ],
  },
];

export default function PublicationsFilterDialog(props: {
  lang: Locale;
  tags: TagIds[];
}) {
  const { lang, tags } = props;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchParams = useSearchParams();

  const createPageURL = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tags', tag);
    params.set('page', '1');
    return `/${lang}/read?${params.toString()}`;
  };

  const getCategoriesFromTags = (
    tags: TagIds[],
    type: 'category' | 'doctrine' | 'bible' | 'theme',
  ) => {
    return tags
      .map((tag) => ({ ...tagDictionary[tag], slug: tag }))
      .filter((item) => item.type === type)
      .map((item) => ({ ...item, slug: createPageURL(item.slug) }));
  };

  const subCategories = getCategoriesFromTags(tags, 'category');
  const filters = [
    {
      id: 'themes',
      name: 'Themes',
      options: getCategoriesFromTags(tags, 'theme'),
    },
    {
      id: 'doctrine',
      name: 'Doctrine',
      options: getCategoriesFromTags(tags, 'doctrine'),
    },
    {
      id: 'book',
      name: 'Book',
      options: getCategoriesFromTags(tags, 'bible'),
    },
  ];

  return (
    <>
      {/* Desktop Filters */}
      <form className="hidden lg:block">
        <ul
          role="list"
          className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
        >
          {subCategories.map((category) => (
            <li key={category[lang]}>
              <a href={category.slug}>{category[lang]}</a>
            </li>
          ))}
        </ul>

        {filters.map((section) => (
          <Disclosure
            key={section.id}
            as="div"
            className="border-b border-gray-200 py-6"
          >
            <h3 className="-my-3 flow-root">
              <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">
                  {section.name}
                </span>
                <span className="ml-6 flex items-center">
                  <PlusIcon
                    aria-hidden="true"
                    className="size-5 group-data-[open]:hidden"
                  />
                  <MinusIcon
                    aria-hidden="true"
                    className="size-5 group-[&:not([data-open])]:hidden"
                  />
                </span>
              </DisclosureButton>
            </h3>
            <DisclosurePanel className="pt-6">
              <div className="space-y-4">
                {section.options.map((option) => (
                  <div key={option[lang]} className="flex gap-3">
                    <Link className="text-sm text-gray-600" href={option.slug}>
                      {option[lang]}
                    </Link>
                  </div>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </form>

      {/* Mobile Button */}
      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="w-fit rounded-3xl border-2 bg-gray-50 px-6 py-1 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-800 lg:hidden"
      >
        <span className="pr-2">Filters</span>
        <FunnelIcon aria-hidden="true" className="inline-block size-5" />
      </button>

      {/* Mobile Dialog */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>
              <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                {subCategories.map((category) => (
                  <li key={category[lang]}>
                    <a href={category.slug} className="block px-2 py-3">
                      {category[lang]}
                    </a>
                  </li>
                ))}
              </ul>

              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-[&:not([data-open])]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option[lang]} className="flex gap-3">
                          <a className="text-gray-500" href={option.slug}>
                            {option[lang]}
                          </a>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
