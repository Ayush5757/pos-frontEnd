import { Button, Group, Text, Collapse, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TextN1 } from "../Text";

const CollapseCard = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box maw={"100%"} mx="auto">
      <Group
        position="start"
        mb={5}
        onClick={toggle}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <TextN1 style={{fontWeight:'600'}}>Poppular Category</TextN1>
        <span style={{fontSize:'26px'}}>+</span>
      </Group>

      <Collapse in={opened}>
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur,
          quas alias. Fugiat facilis eius rerum alias aliquid quibusdam, error
          unde eum. Doloremque accusantium alias cum illum cupiditate quod
          voluptas in, atque corporis quas corrupti ex rerum unde voluptates
          dolorum soluta iusto ea sint est labore ut natus. Voluptate aut
          tempora aperiam! Repellendus et quia assumenda eligendi praesentium,
          aspernatur atque consectetur facere, error consequatur enim veniam qui
          sequi repudiandae! Ipsa architecto minus, eius quisquam incidunt
          placeat aliquam odit sequi voluptate repudiandae molestiae tempore in
          aliquid repellendus non assumenda inventore laboriosam consectetur
          quo, quae eos soluta nisi veritatis eaque! Ab animi maiores officiis
          amet blanditiis veniam fuga, eligendi sapiente non quas obcaecati
          veritatis, possimus aliquid voluptatem vel, reiciendis nisi mollitia
          culpa repellat voluptatibus eius. Ex sed quam magnam cum voluptatem
          velit soluta quo dicta, distinctio a aspernatur ratione nemo sapiente
          odit corrupti asperiores eaque, cumque eius et aliquam hic aperiam
          nesciunt harum deleniti! Facilis qui nam ipsam error ducimus deleniti
          eveniet vel aperiam incidunt officiis officia autem cumque ullam
          pariatur, eaque adipisci eos reiciendis reprehenderit harum, odit
          laboriosam saepe? Sed sequi dolor reprehenderit tenetur blanditiis hic
          velit laboriosam dolore ipsum, laborum asperiores eum cumque sit
          ducimus quos nam dicta corporis ipsa alias aut, praesentium id magnam
          impedit! Nobis consequatur rerum hic libero reprehenderit, nam
          molestiae tenetur iusto cum, commodi necessitatibus quam dolore
          repellat pariatur! Tenetur velit harum ipsum, nostrum veniam dolorem
          iure explicabo eos aut maiores totam quidem voluptatibus ratione
          magnam blanditiis, tempore dolore quasi ducimus, adipisci et. Dolores
          eius ratione animi repudiandae. Temporibus consequatur veritatis
          accusantium error tempora omnis, nostrum dignissimos eaque earum non,
          corrupti odio est quam, facere nihil eligendi ab quasi a? Commodi
          inventore minus aspernatur nesciunt consequuntur, quam odit quibusdam
          culpa, ipsam eligendi saepe dolorum alias animi ratione dolores magni!
          Facere maiores suscipit porro debitis obcaecati accusantium nisi ea
          provident autem veritatis quos numquam iusto voluptas, eaque quasi
          aliquid sunt consectetur? Repellendus quia, officia quisquam eius qui
          dicta inventore provident, perferendis facilis quam porro ex quasi
          enim facere dolores distinctio placeat? Deleniti nulla distinctio
          iusto ipsa dolor consectetur dolores odio velit. Velit labore
          molestias natus repellendus? Voluptatem quam itaque quas mollitia.
          Optio vel sunt recusandae quisquam cupiditate neque quasi tempore
          praesentium eligendi asperiores, impedit nesciunt repudiandae
          suscipit. Voluptates libero perspiciatis aperiam provident. Voluptatum
          delectus architecto, itaque repellat saepe hic fuga, omnis doloremque
          odio quasi, quis fugit provident nulla molestias consectetur maiores
          repudiandae. Consequuntur ut sunt beatae, asperiores, nesciunt vero id
          itaque, impedit consequatur velit hic dignissimos quam esse eum!
          Quibusdam harum ipsam et voluptatum cumque, ipsum molestias
          exercitationem totam molestiae. Id nam minus inventore fuga error, ut
          officia illum quia. Dolor et fuga quibusdam magni. Inventore enim
          magnam sed. Quidem rerum qui, fuga omnis tempore magnam perspiciatis
          natus laborum voluptate eligendi optio beatae, asperiores ducimus
          praesentium architecto tenetur, commodi repudiandae officia nesciunt
          illum dolores sequi eius totam consequatur. Provident corrupti quos
          laborum quis cumque ratione temporibus expedita reiciendis similique.
          Possimus nisi, eos, autem non corrupti sunt nihil eum repellat
          quibusdam quidem rem, aliquid dicta consequuntur? Atque, sunt harum!
        </Text>
      </Collapse>
    </Box>
  );
};
export default CollapseCard;
