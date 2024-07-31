from typing import Literal
from langchain.schema import HumanMessage, SystemMessage
import base64
import os
from langchain_community.document_loaders import DirectoryLoader
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import shutil
import openai

os.environ["OPENAI_API_KEY"] = (
    "sk-proj-XF1IkK9Zg6Auw0gkS6frT3BlbkFJvclzipYWi4W1mA523XBo"
)
llm = ChatOpenAI(model="gpt-4o")
CHROMA_PATH = "/teamspace/studios/this_studio/Hackton/Chroma"
db = Chroma(persist_directory=CHROMA_PATH, embedding_function=OpenAIEmbeddings())


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


# Data model
class Query_Classifier(BaseModel):
    Waste_Categorie: Literal["Paper", "Metal", "Plastique", "Glass"] = Field(
        ...,
        description="""This fiels is the materiel class of a item
    Glass, paper, metal, and similar items are typically categorized into what is known as "material classes" or "material categories." 
    These classes are used to group materials based on their physical and chemical properties""",
    )


class Query_Generator(BaseModel):
    query: str = Field(
        ...,
        description="""This is opptimazed and accurate description of waste you see""",
    )


class Query_Evaluator(BaseModel):
    Recyclability_Rate: int = Field(
        ...,
        description="""This is Recyclability pourcentage (between 0 and 100) of a the  Recyclable materiel that constitue the waste, without the percentage symbol""",
    )
    Quantity: float = Field(
        ...,
        description="""This is quantity of the recyclable materiel of a waste in KG can be float.""",
    )


def Classify(Image):
    # Load and encode the image
    base64_image = Image

    # Prepare the messages
    messages = [
        SystemMessage(
            content="""
        You are a expert  classifier of recyclable waste.\n 
        You take an image of a waste and you determine it's Waste Categorie : 'plastic', 'paper', 'metal', 'glass'.\n
        Considere only these Waste Categories .\n
        """
        ),
        HumanMessage(
            content=[
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
                }
            ]
        ),
    ]
    structured_llm_classifier = llm.with_structured_output(Query_Classifier)
    # Get the response
    response = structured_llm_classifier.invoke(messages)
    return response.Waste_Categorie


def Generate(Image):
    # Load and encode the image
    base64_image = Image

    # Prepare the messages
    messages = [
        SystemMessage(
            content="""
        You are an  expert at generating small and accurate  decsription of a Waste .\n 
        You take an image of a waste and you determine an accurate  decsription of a Waste\n
        be accurate .\n
        """
        ),
        HumanMessage(
            content=[
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
                }
            ]
        ),
    ]
    structured_llm_classifier = llm.with_structured_output(Query_Generator)
    # Get the response
    response = structured_llm_classifier.invoke(messages)
    return response.query


def Get_Context(query, Categorie):
    search_query = query + f" :The Recyclability Rate, The amount of {Categorie} in kg."
    k = 5  # Number of nearst neigbors
    results = db.similarity_search_with_relevance_scores(search_query, k)
    context_text = "\n\n---\n\n".join([chunk.page_content for chunk, _score in results])
    return context_text


def Evaluate(Image):
    Categorie = Classify(Image)
    query = Generate(Image)
    context_text = Get_Context(query, Categorie)
    question = query + f" :The Recyclability Rate, The amount of {Categorie} in kg."
    # print(context_text)
    PROMPT_TEMPLATE = """ You are an assistant for question-answering tasks. 
     Use the following pieces of retrieved context to answer the question. 
     If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.\n
            Question: {question} 
            Context: {context}
        \n\n
        - The Recyclable materiel here is : {Categorie} 
        \n\n
            Your Answer:
         """
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(
        context=context_text, question=question, Categorie=Categorie
    )
    Evaluator = llm.with_structured_output(Query_Evaluator)
    response = Evaluator.invoke(prompt)
    return response, Categorie


def Finale(Image):
    response, Categorie = Evaluate(Image)
    RR = response.Recyclability_Rate / 100  ## Rysaclibility Rate
    QQ = response.Quantity  # Quantity
    print(RR)
    print(QQ)
    Value = int(RR * QQ * 150)
    return {"Value": Value, "Categorie": Categorie}


# image = encode_image(r"C:\Users\hp\gx\images.jpeg")
# print(image)
# result = Finale(image)

# print(result)
