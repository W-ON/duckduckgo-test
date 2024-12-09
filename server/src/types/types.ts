import { Request, Response } from "express";

export interface SearchResult {
  title: string;
  url: string;
}

interface Topic {
  FirstURL: string;
  Icon: {
    Height: string;
    URL: string;
    Width: string;
  };
  Result: string;
  Text: string;
}

interface TopicGroup {
  Name: string;
  Topics: Topic[];
}

export interface DuckDuckGoResponse {
  Abstract: string;
  AbstractSource: string;
  AbstractText: string;
  AbstractURL: string;
  Answer: string;
  AnswerType: string;
  Definition: string;
  DefinitionSource: string;
  DefinitionURL: string;
  Entity: string;
  Heading: string;
  Image: string;
  ImageHeight: number;
  ImageIsLogo: number;
  ImageWidth: number;
  Infobox: string;
  Redirect: string;
  RelatedTopics: (Topic | TopicGroup)[];
  Results: any[];
  Type: string;
}

export interface QueryHistoryItem {
  query: string;
  timestamp: number;
}

export interface TypedRequestQuery extends Request {
  query: {
    q?: string;
    page?: string;
    pageSize?: string;
  };
}

export interface TypedRequestBody extends Request {
  body: {
    query?: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SearchParams {
  query: string;
  page?: number;
  pageSize?: number;
}
